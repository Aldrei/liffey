import db from '@/database/instance';
import { Clients, IProperty, Properties } from '@/database/models';
import { propertyParsePayloadPtToEn } from '@/database/parse/property';
import { dateBrToDb, decimalBrToDb, makeCodePretty } from '@/helpers';
import { extractUserFromToken } from '@/helpers/token';
import { Request, Response } from 'express';

import { Result, validationResult } from 'express-validator';

const getNextCodeType = async (type: string): Promise<number> => {
  try {
    const max = await Properties.max('code_type', { where: { type } })
    return max !== null ? Number(max) + 1 : 1;
  } catch (error) {
    console.error('Error in getNextCodeType:', error);
  }
};

export const validator = (body: any): Result => {
  const rules: any = {};

  if (!body.hasOwnProperty('city_id')) rules.city_id = 'required';
  if (!body.hasOwnProperty('neighborhood_id')) rules.neighborhood_id = 'required';
  if (!body.hasOwnProperty('owner_id')) rules.owner_id = 'required';

  rules.broker_id = 'required';
  rules.agent_id = 'required';

  return validationResult(body);
}

const prepareStore = (body: any): Partial<IProperty> => {
  const inputs: Partial<IProperty> = propertyParsePayloadPtToEn(body)

  inputs.total_area = decimalBrToDb(body.areaTotal)
  inputs.built_area = decimalBrToDb(body.areaConstruida)
  inputs.front_area = decimalBrToDb(body.areaFrente)
  inputs.back_area = decimalBrToDb(body.areaFundos)
  inputs.right_area = decimalBrToDb(body.areaDireita)
  inputs.left_area = decimalBrToDb(body.areaEsquerda)

  inputs.value = decimalBrToDb(body.valor)
  inputs.condo_value = decimalBrToDb(body.valorCondominio)
  inputs.iptu_value = decimalBrToDb(body.valorIPTU)

  inputs.agency_date = dateBrToDb(body.dataAgenciamento)
  inputs.rent_start_period = dateBrToDb(body.aluguelPeriodoInicio)
  inputs.rent_end_period = dateBrToDb(body.aluguelPeriodoFim)
  inputs.sale_date = dateBrToDb(body.dataVenda)
  inputs.exclusivity_start_period = dateBrToDb(body.exclusividadePeriodoInicio)
  inputs.exclusivity_end_period = dateBrToDb(body.exclusividadePeriodoFim)

  // inputs.client_id = body.client.id
  // inputs.code = body.client.property_count

  if (body.type) {
    inputs.code_type = getNextCodeType(body.type) as unknown as number
    inputs.code_pretty = makeCodePretty(body.type, inputs.code_type);
  }

  return inputs
}

export const store = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    body.client_id = client.id
    body.code = client.property_count+1

    const validatorResult = validator(body)

    if (!validatorResult.isEmpty())
      return res.status(202).json({ error: validatorResult.array() })

    const inputs = prepareStore(body);
    
    /**
     * Start transaction
    */
    const t = await db.transaction()

    const newProperty = await Properties.create(inputs, { transaction: t });
    await Clients.update({ property_count: body.code }, { transaction: t, where: { id: client.id } })

    t.commit()
    /**
     * Commit transaction
    */

    res.status(200).json({ property: newProperty, message: 'Property created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

import db from '@/database/instance';
import { Clients, IProperty, Properties, PropertyModel } from '@/database/models';
import { propertyParsePayloadPtToEn } from '@/database/parse/property';
import { dateBrToDb, decimalBrToDb, makeCodePretty } from '@/helpers';
import { extractUserFromToken } from '@/helpers/token';
import { Request, Response } from 'express';

import { Result, validationResult } from 'express-validator';

const getNextCodeType = async (type: string, client_id: number): Promise<number> => {
  try {
    const max = await Properties.max('code_type', { where: { client_id, type } })
    return max ? Number(max)+1 : 1;
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

const prepareFieldsToCreateAndUpdate = (body: any): Partial<IProperty> => {
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

  return inputs
}

const prepareFieldsToCreate = async (body: any, client_id: number): Promise<Partial<IProperty>> => {
  let inputs: Partial<IProperty> = propertyParsePayloadPtToEn(body)

  inputs = prepareFieldsToCreateAndUpdate(body)

  if (inputs.type) {
    inputs.code_type = await getNextCodeType(inputs.type, client_id) as unknown as number
    inputs.code_pretty = makeCodePretty(inputs.type, inputs.code_type);
  }

  return inputs
}

const prepareFieldsToUpdate = async (body: any, client_id: number, property: PropertyModel): Promise<Partial<IProperty>> => {
  let inputs: Partial<IProperty> = propertyParsePayloadPtToEn(body)

  inputs = prepareFieldsToCreateAndUpdate(body)

  if (inputs.type && inputs.type !== property.type) {
    inputs.code_type = await getNextCodeType(inputs.type, client_id) as unknown as number
    inputs.code_pretty = makeCodePretty(inputs.type, inputs.code_type);
  }

  if (inputs.type && (!property.code_pretty || !property.code_type)) {
    inputs.code_type = await getNextCodeType(inputs.type, client_id) as unknown as number
    inputs.code_pretty = makeCodePretty(inputs.type, inputs.code_type);
  }

  if (!inputs.type) {
    inputs.code_type = null;
    inputs.code_pretty = null;
  }

  return inputs
}

export const store = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    body.client_id = client.id
    body.code = client.property_count+1

    const validatorResult = validator(body)

    if (!validatorResult.isEmpty())
      return res.status(202).json({ error: validatorResult.array() })

    const inputs = await prepareFieldsToCreate(body, client.id);

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

    return res.status(200).json({ property: newProperty, message: 'Property created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    const { body } = req

    const { client } = extractUserFromToken(req)

    const validatorResult = validator(body)

    if (!validatorResult.isEmpty())
      return res.status(202).json({ error: validatorResult.array() })

    const property = await Properties.findOne({ where: { client_id: client.id, id } })
    const inputs = await prepareFieldsToUpdate(body, Number(client.id), property);

    const updatedProperty = await property.update(inputs)

    return res.status(200).json({ property: { data: updatedProperty }, message: 'Property updated successfully', status: 200 });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const detail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    const { client } = extractUserFromToken(req)

    const property = await Properties.findOne({ where: { client_id: client.id, id } })

    return res.status(200).json({ property: { data: property } });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}
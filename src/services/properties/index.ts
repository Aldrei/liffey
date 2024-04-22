import db from '@/database/instance';
import { Cities, Clients, Employees, IProperty, Neighborhoods, Owners, Photos, Properties, PropertyModel, Videos } from '@/database/models';
import { propertyParseEnToPt, propertyParsePayloadPtToEn } from '@/database/parse/property';
import { transformProperty } from '@/database/transformers/property';
import { dateBrToDb, decimalBrToDb, makeCodePretty } from '@/helpers';
import { getLimit, getNextPage, getOffset, getPerPage, getPrevPage, getValidPage } from '@/helpers/paginate';
import { extractUserFromToken } from '@/helpers/token';
import { Request, Response } from 'express';

const getNextCodeType = async (type: string, client_id: number): Promise<number> => {
  try {
    const max = await Properties.max('code_type', { where: { client_id, type } })
    return max ? Number(max)+1 : 1;
  } catch (error) {
    console.error('Error in getNextCodeType:', error);
  }
};

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
  /**
    * Start transaction
  */
  const t = await db.transaction()

  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    body.client_id = client.id
    body.code = client.property_count+1

    const inputs = await prepareFieldsToCreate(body, client.id);

    const newProperty = await Properties.create(inputs, { transaction: t });
    await Clients.update({ property_count: body.code }, { transaction: t, where: { id: client.id } })

    /**
     * Commit transaction
    */
    await t.commit()

    return res.status(200).json({ 
      property: {
        data: newProperty
      }, 
      message: 'Property created successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);

    /**
     * Rollback transaction
    */
    await t.rollback();

    return res.status(500).json({ error: error.message });
  }
}

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    const { body } = req

    const { client } = extractUserFromToken(req)

    const property = await Properties.findOne({ where: { client_id: client.id, id } })
    const inputs = await prepareFieldsToUpdate(body, Number(client.id), property);

    const updatedProperty = await property.update(inputs)

    return res.status(200).json({ 
      property: { data: updatedProperty }, 
      message: 'Property updated successfully', 
      status: 200 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const detail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { code } = req.params

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const property = await Properties.findOne({
      where: { client_id: client.id, code },
      include: [{
        model: Cities,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: Neighborhoods,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: Photos,
        required: false,
        attributes: ['id', 'src', 'order', 'rotate']
      }, {
        model: Videos,
        required: false,
        attributes: ['id', 'src']
      }, {
        model: Owners,
        required: false,
        attributes: ['id', 'name_or_company']
      }, {
        model: Employees,
        required: false,
        as: 'Broker',
        attributes: ['id', 'name']
      }, {
        model: Employees,
        required: false,
        as: 'Agent',
        attributes: ['id', 'name']
      }]
    })

    // Transformed data
    const transformedData = transformProperty(property, client)

    const enDataFields = {
      property: {
        data: transformedData,
        message: 'Success',
        status: 200
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.property.data = propertyParseEnToPt(transformedData)
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang, page } = req.query

    const PAGE = getValidPage(page)

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const properties = await Properties.findAll({
      where: {
        client_id: client.id
      },
      offset: getOffset(PAGE),
      limit: getLimit(),
      include: [{
        model: Cities,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: Neighborhoods,
        required: false,
        attributes: ['id', 'name']
      }, {
        model: Photos,
        required: false,
        attributes: ['id', 'src', 'order', 'rotate']
      }, {
        model: Videos,
        required: false,
        attributes: ['id', 'src']
      }, {
        model: Owners,
        required: false,
        attributes: ['id', 'name_or_company']
      }, {
        model: Employees,
        required: false,
        as: 'Broker',
        attributes: ['id', 'name']
      }, {
        model: Employees,
        required: false,
        as: 'Agent',
        attributes: ['id', 'name']
      }]
    })

    // Transformed data
    const transformedData = properties.map((item: IProperty) => transformProperty(item, client))

    const enDataFields = {
      paginate: {
        data: transformedData,
        meta: {
          pagination: {
            // total: 132,
            // count: 10,
            per_page: getPerPage(),
            current_page: PAGE,
            // total_pages: 14,
            links: {
                previous: getPrevPage(PAGE),
                next: getNextPage(PAGE)
            }
          }
        },
        message: 'Success',
        status: 200
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.paginate.data = transformedData.map((item: IProperty) => propertyParseEnToPt(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

import { Cities, Clients, ICity, States } from '@/database/models'
import { cityParseEnToPt, cityParsePtToEn } from '@/database/parse/city'
import { transformCity } from '@/database/transformers/city'
import { getPaginateConditions, getPaginateMetadata } from '@/helpers/paginate'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { TCityResponse } from './types'

const prepareFieldsToCreate = async (body: any): Promise<Partial<ICity>> => cityParsePtToEn(body) as Partial<ICity>
const prepareFieldsToUpdate = async (body: any): Promise<Partial<ICity>> => cityParsePtToEn(body) as Partial<ICity>

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { search } = req.params

    const { client } = extractUserFromToken(req)

    // Raw data
    const cities = await Cities.findAll({ 
      where: { 
        client_id: client.id,
        name: {
          [Op.like]: `%${search}%`
        }
      } 
    })

    // Transformed data
    const transformedCities = cities.map(city => transformCity(city))

    const enDataFields = {
      data: transformedCities
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.data = transformedCities.map((item: ICity) => cityParseEnToPt<TCityResponse>(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang, page, orderASC } = req.query
    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const total = await Cities.count({
      where: {
        client_id: client.id
      },
    })

    const dataList = await Cities.findAll({
      where: {
        client_id: client.id,
      },
      order: [
        ['id', orderASC === 'false' ? 'DESC' : 'ASC']
      ],
      ...getPaginateConditions(page)
    })

    // Transformed data
    const transformedData = dataList.map((item: ICity) => transformCity(item))

    const enDataFields = {
      paginate: {
        data: transformedData,
        message: 'Success',
        status: 200,
        ...getPaginateMetadata(page, total, 'cities'),
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.paginate.data = transformedData.map((item: ICity) => cityParseEnToPt(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const store = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    body.client_id = client.id

    const inputs = await prepareFieldsToCreate(body);

    const newData = await Cities.create(inputs);
    const transformedData = transformCity(newData)

    return res.status(200).json({
      city: {
        data: transformedData
      }, 
      message: 'City created successfully',
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
    const { id } = req.params

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const dataFound = await Cities.findOne({
      where: { client_id: client.id, id },
      include: [{
        model: States,
        required: false
      }]
    })

    // Transformed data
    const transformedData = transformCity(dataFound)

    const enDataFields = {
      city: {
        data: transformedData,
        message: 'Success',
        status: 200
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.city.data = cityParseEnToPt(transformedData)
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}
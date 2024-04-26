import { Clients, INeighborhood, Neighborhoods } from '@/database/models'
import { neighborhoodParseEnToPt, neighborhoodParsePtToEn } from '@/database/parse/neighborhood'
import { transformNeighborhood } from '@/database/transformers/neighborhood'
import { getPaginateConditions, getPaginateMetadata } from '@/helpers/paginate'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { TNeighborhoodResponse } from './types'

const prepareFieldsToCreate = async (body: any): Promise<Partial<INeighborhood>> => neighborhoodParsePtToEn(body) as Partial<INeighborhood>
const prepareFieldsToUpdate = async (body: any): Promise<Partial<INeighborhood>> => neighborhoodParsePtToEn(body) as Partial<INeighborhood>

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { city_id, search } = req.params

    const { client } = extractUserFromToken(req)

    // Raw data
    const neighborhoods = await Neighborhoods.findAll({ 
      where: { 
        client_id: client.id,
        city_id,
        name: {
          [Op.like]: `%${search}%`
        }
      } 
    })

    // Transformed data
    const transformedNeighborhoods = neighborhoods.map(neigh => transformNeighborhood(neigh))

    const enDataFields = {
      data: transformedNeighborhoods
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.data = transformedNeighborhoods.map((item: INeighborhood) => neighborhoodParseEnToPt<TNeighborhoodResponse>(item))
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
    const total = await Neighborhoods.count({
      where: {
        client_id: client.id
      },
    })

    const dataList = await Neighborhoods.findAll({
      where: {
        client_id: client.id,
      },
      order: [
        ['id', orderASC === 'false' ? 'DESC' : 'ASC']
      ],
      ...getPaginateConditions(page)
    })

    // Transformed data
    const transformedData = dataList.map((item: INeighborhood) => transformNeighborhood(item))

    const enDataFields = {
      paginate: {
        data: transformedData,
        message: 'Success',
        status: 200,
        ...getPaginateMetadata(page, total, 'neighborhoods'),
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.paginate.data = transformedData.map((item: INeighborhood) => neighborhoodParseEnToPt(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const store = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { body } = req

    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    body.client_id = client.id

    const inputs = await prepareFieldsToCreate(body);

    const newData = await Neighborhoods.create(inputs);
    const transformedData = transformNeighborhood(newData)

    const enDataFields = {
      neighborhood: {
        data: transformedData
      },
      message: 'Neighborhood created successfully',
      status: 200
    }

    if (lang !== 'EN') {
      enDataFields.neighborhood.data = neighborhoodParseEnToPt(transformedData)
    }

    return res.status(200).json(enDataFields);
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
    const dataFound = await Neighborhoods.findOne({
      where: { client_id: client.id, id },
    })

    // Transformed data
    const transformedData = transformNeighborhood(dataFound)

    const enDataFields = {
      neighborhood: {
        data: transformedData,
        message: 'Success',
        status: 200
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.neighborhood.data = neighborhoodParseEnToPt(transformedData)
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { id } = req.params
    const { body } = req

    body.client_id = client.id

    const dataFound = await Neighborhoods.findOne({ where: { client_id: client.id, id } })
    const inputs = await prepareFieldsToUpdate(body);

    const newData = await dataFound.update(inputs);

    return res.status(200).json({ 
      neighborhood: {
        data: newData
      }, 
      message: 'City updated successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const destroy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })
    const dataDeleted = await Neighborhoods.destroy({ where: { client_id: client.id, id } })

    return res.status(200).json({ status: 200, message: 'Successful.', response: dataDeleted });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}
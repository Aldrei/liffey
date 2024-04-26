import { Clients, INeighborhood, Neighborhoods } from '@/database/models'
import { neighborhoodParseEnToPt, neighborhoodParsePtToEn } from '@/database/parse/neighborhood'
import { transformNeighborhood } from '@/database/transformers/neighborhood'
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
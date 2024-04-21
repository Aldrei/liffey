import { INeighborhood, Neighborhoods } from '@/database/models'
import { neighborhoodParseEnToPt } from '@/database/parse/neighborhood'
import { transformNeighborhood } from '@/database/transformers/neighborhood'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { TNeighborhoodResponse } from './types'

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

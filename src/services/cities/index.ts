import { Cities, ICity } from '@/database/models'
import { cityParseEnToPt } from '@/database/parse/city'
import { transformCity } from '@/database/transformers/city'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { TCityResponse } from './types'

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

import { Cities } from '@/database/models'
import { transformCity } from '@/database/transformers/city'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { search } = req.params

    const { client } = extractUserFromToken(req)

    const cities = await Cities.findAll({ 
      where: { 
        client_id: client.id,
        name: {
          [Op.like]: `%${search}%`
        }
      } 
    })

    const transformedCities = cities.map(city => transformCity(city))

    return res.status(200).json({ data: transformedCities });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

import { Neighborhoods } from '@/database/models'
import { transformNeighborhood } from '@/database/transformers/neighborhood'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { city_id, search } = req.params

    const { client } = extractUserFromToken(req)

    const neighborhoods = await Neighborhoods.findAll({ 
      where: { 
        client_id: client.id,
        city_id,
        name: {
          [Op.like]: `%${search}%`
        }
      } 
    })

    const transformedNeighborhoods = neighborhoods.map(neigh => transformNeighborhood(neigh))

    return res.status(200).json({ data: transformedNeighborhoods });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

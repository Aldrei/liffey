import { Owners } from '@/database/models'
import { transformOwner } from '@/database/transformers/owner'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { search } = req.params

    const { client } = extractUserFromToken(req)

    const owners = await Owners.findAll({ 
      where: { 
        client_id: client.id,
        name_or_company: {
          [Op.like]: `%${search}%`
        }
      } 
    })

    const transformedOwners = owners.map(owner => transformOwner(owner))

    return res.status(200).json({ data: transformedOwners });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

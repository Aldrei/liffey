import { IOwner, OwnerModel, Owners } from '@/database/models'
import { ownerParseEnToPt } from '@/database/parse/owner'
import { transformOwner } from '@/database/transformers/owner'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

export const search = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { search } = req.params

    const { client } = extractUserFromToken(req)

    // Raw data
    let owners: OwnerModel[]

    owners = await Owners.findAll({ 
      where: { 
        client_id: client.id,
        id: search
      } 
    })

    if (!owners?.length)
      owners = await Owners.findAll({ 
        where: { 
          client_id: client.id,
          name_or_company: {
            [Op.like]: `%${search}%`
          }
        } 
      })

    // Transformed data
    const transformedOwners = owners.map(owner => transformOwner(owner))

    const enDataFields = {
      data: transformedOwners,
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.data = transformedOwners.map((item: IOwner) => ownerParseEnToPt<IOwner>(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

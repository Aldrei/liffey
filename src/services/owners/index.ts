import { Clients, IOwner, OwnerModel, Owners } from '@/database/models'
import { ownerParseEnToPt } from '@/database/parse/owner'
import { transformOwner } from '@/database/transformers/owner'
import { getLimit, getNextPage, getOffset, getPerPage, getPrevPage, getTotalPages, getValidPage } from '@/helpers/paginate'
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

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang, page, orderASC } = req.query

    const ORDER_ASC = orderASC === 'false' ? 'DESC' : 'ASC'
    const PAGE = getValidPage(page)

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const total = await Owners.count({ 
      where: {
        client_id: client.id
      },
    })

    const owners = await Owners.findAll({
      where: {
        client_id: client.id,
      },
      order: [
        ['id', ORDER_ASC]
      ],
      offset: getOffset(PAGE),
      limit: getLimit(),
    })

    // Transformed data
    const transformedData = owners.map((item: IOwner) => transformOwner(item))

    const enDataFields = {
      paginate: {
        data: transformedData,
        meta: {
          pagination: {
            total: total,
            per_page: getPerPage(),
            current_page: PAGE,
            total_pages: getTotalPages(total),
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
      enDataFields.paginate.data = transformedData.map((item: IOwner) => ownerParseEnToPt(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

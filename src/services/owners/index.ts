import { Cities, Clients, IOwner, Neighborhoods, OwnerModel, Owners } from '@/database/models'
import { ownerParseEnToPt, ownerParsePayloadPtToEn } from '@/database/parse/owner'
import { ITransformedOwners, transformOwner } from '@/database/transformers/owner'
import { getLimit, getNextPage, getOffset, getPerPage, getPrevPage, getTotalPages, getValidPage } from '@/helpers/paginate'
import { extractUserFromToken } from '@/helpers/token'
import { Request, Response } from 'express'
import { Op } from 'sequelize'


const prepareFieldsToCreate = async (body: any): Promise<Partial<IOwner>> => ownerParsePayloadPtToEn(body) as Partial<IOwner>
const prepareFieldsToUpdate = async (body: any): Promise<Partial<IOwner>> => ownerParsePayloadPtToEn(body) as Partial<IOwner>

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
      enDataFields.data = transformedOwners.map((item: ITransformedOwners) => ownerParseEnToPt<ITransformedOwners>(item))
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

export const store = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    body.client_id = client.id

    const inputs = await prepareFieldsToCreate(body);

    const newData = await Owners.create(inputs);

    return res.status(200).json({ 
      owner: {
        data: newData
      }, 
      message: 'Owner created successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
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

    const owner = await Owners.findOne({ where: { client_id: client.id, id } })
    const inputs = await prepareFieldsToUpdate(body);

    const newData = await owner.update(inputs);

    return res.status(200).json({ 
      owner: {
        data: newData
      }, 
      message: 'Owner updated successfully',
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
    const owner = await Owners.findOne({
      where: { client_id: client.id, id },
      include: [{
        model: Cities,
        required: false
      }, {
        model: Neighborhoods,
        required: false
      }]
    })

    // Transformed data
    const transformedData = transformOwner(owner)

    const enDataFields = {
      owner: {
        data: transformedData,
        message: 'Success',
        status: 200
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.owner.data = ownerParseEnToPt(transformedData)
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

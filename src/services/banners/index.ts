import { Banners, Clients, IBanner, Properties } from "@/database/models"
import { bannerParseEnToPt } from "@/database/parse/banner"
import { transformBanner } from "@/database/transformers/banner"
import { getPaginateConditions, getPaginateMetadata } from "@/helpers/paginate"
import { extractUserFromToken } from "@/helpers/token"

import { Request, Response } from 'express'

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang, page, orderASC } = req.query
    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const total = await Banners.count({ 
      where: {
        client_id: client.id
      },
    })

    const dataFound = await Banners.findAll({
      where: {
        client_id: client.id,
      },
      order: [
        ['id', orderASC === 'false' ? 'DESC' : 'ASC']
      ],
      include: [{
        model: Properties,
        required: false,
        attributes: ['id']
      }],
      ...getPaginateConditions(page)
    })

    // Transformed data
    const transformedData = dataFound.map((item: IBanner) => transformBanner(item))

    const enDataFields = {
      paginate: {
        data: transformedData,
        message: 'Success',
        status: 200,
        ...getPaginateMetadata(page, total, 'owners'),
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.paginate.data = transformedData.map((item: IBanner) => bannerParseEnToPt(item))
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}
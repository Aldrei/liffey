import { Banners, Clients, IBanner, Properties } from "@/database/models"
import { bannerParseEnToPt, bannerParsePtToEn } from "@/database/parse/banner"
import { transformBanner } from "@/database/transformers/banner"
import { getPaginateConditions, getPaginateMetadata } from "@/helpers/paginate"
import { extractUserFromToken } from "@/helpers/token"

import { Request, Response } from 'express'

const prepareFieldsToCreate = async (body: any): Promise<Partial<IBanner>> => bannerParsePtToEn(body) as Partial<IBanner>
const prepareFieldsToUpdate = async (body: any): Promise<Partial<IBanner>> => bannerParsePtToEn(body) as Partial<IBanner>
const prepareFieldsToUpdatePositions = (body: any): any[] => body?.data?.length ? body.data : []

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
        ['position', orderASC === 'false' ? 'DESC' : 'ASC']
      ],
      include: [{
        model: Properties,
        required: false,
        attributes: ['id', 'code', 'general_description']
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
        ...getPaginateMetadata(page, total, 'banners'),
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

export const detail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang } = req.query
    const { id } = req.params

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const dataFound = await Banners.findOne({
      where: { client_id: client.id, id },
      include: [{
        model: Properties,
        required: false,
        attributes: ['id', 'code', 'general_description']
      }]
    })

    // Transformed data
    const transformedData = transformBanner(dataFound)

    const enDataFields = {
      banner: {
        data: transformedData,
        message: 'Success',
        status: 200
      }
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.banner.data = bannerParseEnToPt(transformedData)
    }

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
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

    const dataUpdated = await Banners.findOne({ where: { client_id: client.id, id } })
    const inputs = await prepareFieldsToUpdate(body);

    const newData = await dataUpdated.update(inputs);

    return res.status(200).json({
      banner: {
        data: newData
      }, 
      message: 'Banner updated successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const destroy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })
    const dataDeleted = await Banners.destroy({ where: { client_id: client.id, id } })

    return res.status(200).json({ status: 200, message: 'Successful.', response: dataDeleted });
  } catch (error) {
    console.error(error);
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

    const newData = await Banners.create(inputs);

    return res.status(200).json({
      banner: {
        data: newData
      }, 
      message: 'Banner created successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export const updatePositions = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = extractUserFromToken(req)
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const { body } = req

    const inputs = prepareFieldsToUpdatePositions(body);

    inputs.forEach(async (item, i) => {
      await Banners.update(
        { position: i+1, },
        { where: { client_id: client.id, id: item.banner_id } }
      )
    })

    return res.status(200).json({
      message: 'Banner updated successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

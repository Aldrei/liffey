import { Clients, IMessage, Messages } from "@/database/models"
import { transformMessage } from "@/database/transformers/message"
import { getPaginateConditions, getPaginateMetadata } from "@/helpers/paginate"
import { extractUserFromToken } from "@/helpers/token"
import { Request, Response } from 'express'

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lang, page, orderASC } = req.query
    const { client: clientJwt } = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { id: clientJwt.id } })

    // Raw data
    const total = await Messages.count({ 
      where: {
        client_id: client.id
      },
    })

    const dataFound = await Messages.findAll({
      where: {
        client_id: client.id,
      },
      order: [
        ['id', orderASC === 'false' ? 'DESC' : 'ASC']
      ],
      ...getPaginateConditions(page)
    })

    // Transformed data
    const transformedData = dataFound.map((item: IMessage) => transformMessage(item))

    const enDataFields = {
      paginate: {
        data: transformedData,
        message: 'Success',
        status: 200,
        ...getPaginateMetadata(page, total, 'owners'),
      }
    }

    // Translated fields
    // Message was created correctly

    return res.status(200).json(enDataFields);
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: error.message });
  }
}

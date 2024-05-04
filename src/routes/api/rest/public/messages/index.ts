import { Clients, IMessage, Messages } from "@/database/models";
import { router } from "@/express.instance";
import { Request, Response } from 'express';

const prepareFieldsToCreate = (body: any): Partial<IMessage> => body as Partial<IMessage>

router.post('/api/pub/:domain/messages', async (req: Request, res: Response) => {
  try {
    const { domain } = req.params

    const client = await Clients.findOne({ where: { domain } })

    const { body } = req
    body.client_id = client.id

    const inputs = prepareFieldsToCreate(body)

    await Messages.create(inputs);

    return res.status(200).json({ 
      message: 'Message created successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
})

export default router

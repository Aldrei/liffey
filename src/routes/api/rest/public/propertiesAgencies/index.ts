import { Clients, IPropertiesAgencies, PropertiesAgencies } from "@/database/models"
import { propertyAgencyParsePayloadPtToEn } from "@/database/parse/propertyAgency"
import { router } from "@/express.instance"
import { Request, Response } from 'express'

const prepareFieldsToCreate = (body: any): Partial<IPropertiesAgencies> => propertyAgencyParsePayloadPtToEn<Partial<IPropertiesAgencies>>(body)

router.post('/api/pub/:domain/properties/agency', async (req: Request, res: Response) => {
  try {
    const { domain } = req.params

    const client = await Clients.findOne({ where: { domain } })

    const { body } = req
    body.client_id = client.id

    const inputs = prepareFieldsToCreate(body)

    await PropertiesAgencies.create(inputs)

    return res.status(200).json({
      message: 'Property agency created successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
})

export default router

import { Clients, Roles } from "@/database/models";
import { clientParseEnToPt } from "@/database/parse/client";
import { employeeParseEnToPt } from "@/database/parse/employee";
import { transformClient } from "@/database/transformers/client";
import { router } from "@/express.instance";
import { extractUserFromToken } from "@/helpers/token";
import { getEmployee } from "@/services/employees/micro";
import { Request, Response } from "express";

router.get('/api/who-is-auth', async (req: Request, res: Response) => {
  try {
    const lang = req.header('lang')

    const { user, error } = extractUserFromToken(req)
    if (error) return res.status(401).json({ error: `Forbidden. ${error}` })

    // Raw data
    const client = await Clients.findOne({ where: { user_id: user.id } })

    const transformedEmployee = await getEmployee({ clientId: String(client.id), userId: user.id, lang })

    const roles = await Roles.findAll()

    // Transformed data
    const transformedClient = transformClient(client)
    
    const enDataFields = {
      client: {
        data: transformedClient
      },
      employee: {
        data: transformedEmployee
      },
      db_roles: roles,
    }

    // Translated fields
    if (lang !== 'EN') {
      enDataFields.client.data = clientParseEnToPt(transformedClient)
      enDataFields.employee.data = employeeParseEnToPt(transformedEmployee)
    }

    return res.json(enDataFields)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    })
  }
})

export default router

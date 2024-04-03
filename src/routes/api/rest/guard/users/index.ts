import { Clients, Employees, Permissions, Roles } from "@/database/models";
import { clientParseEnToPt } from "@/database/parse/client";
import { employeeParseEnToPt } from "@/database/parse/employee";
import { transformClient } from "@/database/transformers/client";
import { transformEmployee } from "@/database/transformers/employee";
import { router } from "@/express.instance";
import { extractUserFromToken } from "@/helpers/token";
import { Request, Response } from "express";

router.get('/api/who-is-auth', async (req: Request, res: Response) => {
  try {
    const fieldsLanguage = req.header('fieldsLanguage')

    const { user } = extractUserFromToken(req)

    // Raw data
    const client = await Clients.findOne({ where: { user_id: user.id } })
    const employee = await Employees.findOne({ where: { user_id: user.id } })

    const roles = await Roles.findAll()
    const permissions = await Permissions.findAll()

    // Transformed data
    const transformedClient = transformClient(client)
    const transformedEmployee = transformEmployee(employee)
    
    const enDataFields = {
      client: {
        data: transformedClient
      },
      employee: {
        data: transformedEmployee
      },
      db_roles: roles,
      db_permissions: permissions
    }

    // Translated fields
    if (fieldsLanguage !== 'EN') {
      enDataFields.client.data = clientParseEnToPt(transformedClient)
      enDataFields.employee.data = employeeParseEnToPt(transformedEmployee)
    }

    return res.send(enDataFields)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message
    })
  }
})

export default router

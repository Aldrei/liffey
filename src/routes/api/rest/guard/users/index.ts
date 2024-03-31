import { Clients, Employees, Permissions, Roles } from "@/database/models";
import { router } from "@/express.instance";
import { extractUserFromToken } from "@/helpers/token";
import { Request, Response } from "express";

router.get('/api/who-is-auth', async (req: Request, res: Response) => {
  try {
    const user = extractUserFromToken(req)

    const client = await Clients.findOne({ where: { user_id: user.id } })
    const employee = await Employees.findOne({ where: { user_id: user.id } })

    const roles = await Roles.findAll()
    const permissions = await Permissions.findAll()
    
    return res.send({
      client: {
        data: client
      },
      employee: {
        data: employee
      },
      db_roles: roles,
      db_permissions: permissions
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message
    })
  }
})

export default router

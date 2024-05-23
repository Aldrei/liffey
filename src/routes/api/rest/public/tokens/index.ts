import ENV from "@/config";
import { Employees, Users } from "@/database/models";
import { router } from "@/express.instance";
import { comparePass } from "@/helpers/pass";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";

router.post('/oauth/access_token', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const user = await Users.findOne({
      where: {
        [Op.or]: [{ email: username }, { username: username }]
      },
      attributes: ['id', 'password', 'email', 'username']
    })

    if (!user?.id) return res.status(401).send({ error: 'Forbidden. Username or password incorrect.' })

    const check = comparePass(password, user.password)
    if (!check) return res.status(401).send({ error: 'Forbidden. Username or password incorrect.' })

    const employee = await Employees.findOne({ where: { user_id: user.id } })

    const token = jwt.sign({ user: {
      id: user.id,
      email: user.email,
      username: user.username
    }, client: {
      id: employee.client_id
    }}, ENV.JWT_SECRET)

    return res.send({
      token_type: "Bearer",
      refresh_token: token,
      access_token: token,
      expires_in: 0,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: error.message
    })
  }
})

export default router
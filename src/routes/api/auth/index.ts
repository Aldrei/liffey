import ENV from "@/config";
import { Users } from "@/database/models";
import { router } from "@/express.instance";
import { comparePass } from "@/helpers/pass";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

router.post('/oauth/access_token', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const user = await Users.findOne({
      where: { email: username },
      attributes: ['password', 'email']
    })

    const check = comparePass(password, user.password)

    if (!check) return res.status(401).send({ error: 'Forbidden. Username or password incorrect.' })

    const token = jwt.sign({ email: username }, ENV.JWT_SECRET)

    res.send({
      token_type: "Bearer",
      refresh_token: token,
      access_token: token,
      expires_in: 0,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message
    })
  }
})

export default router
import ENV from "@/config";
import { AuthTokens, Users } from "@/database/models";
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

router.get('/token/encrypt', async (req: Request, res: Response) => {
  try {
    const token = jwt.sign('bla bla bla', ENV.JWT_SECRET, { algorithm: 'HS256' })

    return res.send({
      data: token,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: error?.message,
    })
  }
});

router.get('/token/decrypt', async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    const decrypted = jwt.verify(token, ENV.JWT_SECRET)

    return res.send({
      data: decrypted,
    });
  } catch (error) {
    console.log(error);
    return res.send({ message: error?.message })
  }
});

router.get('/token/all', async (req: Request, res: Response) => {
  try {
    const result = await AuthTokens.findAll()

    return res.send({
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.send({ message: error?.message })
  }
});

export default router
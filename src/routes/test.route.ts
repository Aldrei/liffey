import ENV from "@/config";
import { AuthTokens } from "@/database/models/AuthToken";
import { router } from "@/express.instance";
import { Request, Response } from "express";

import jwt from 'jsonwebtoken';

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

export default router;

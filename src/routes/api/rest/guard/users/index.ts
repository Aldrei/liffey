import { router } from "@/express.instance";
import { Request, Response } from "express";

router.get('/api/who-is-auth', async (req: Request, res: Response) => {
  try {
    
    return res.send({
      message: 'Who is auth?'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message
    })
  }
})

export default router
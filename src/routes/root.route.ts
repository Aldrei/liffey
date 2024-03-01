import { router } from '@/express.instance';
import { Request, Response } from "express";

router.get('/root', (_: Request, res: Response) => {
  res.send('Birds home page')
})

export default router;

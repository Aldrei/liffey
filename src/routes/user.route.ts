import { router } from "@/express.instance";
import { IUser } from "@/routes/types";
import { Request, Response } from "express";

import { User } from "@/database/create";

router.post('/users',
  async (req: Request, res: Response) => {
    // Model the input data from the IUser interface.
    // const newUserData = filterObjectByInterface<IUser>(req.body)

    const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
    const message = `I'M TSX WATCH MOTHER FUCKER! Jane's auto-generated ID: ${jane.id}`;

  res.send({ newUserData: message, reqBody: req.body, test: {} as IUser });
});

router.get('/users', (_req: Request, res: Response) => {
  res.send('Users list');
});

router.get('/users/:id', (_req: Request, res: Response) => {
  res.send('Users find');
});

router.put('/users/:id', (_req: Request, res: Response) => {
  res.send('Users update');
});

router.delete('/users/:id', (_req: Request, res: Response) => {
  res.send('Users delete');
});

export default router;

import { Users } from "@/database/models";
import { router } from "@/express.instance";
import { Request, Response } from "express";

router.post('/users',
  async (req: Request, res: Response) => {

  const newUser = await Users.create({ 
    name: req.body.firstName, 
    email: req.body.email 
  });
    
  const message = `test New user auto-generated ID: ${newUser.id}`;

  res.send({ 
    message: message, 
    data: newUser, 
    req: req.body 
  });
});

router.get('/users', async (_req: Request, res: Response) => {
  const users = await Users.findAll()

  res.send({
    message: '',
    data: users
  });
});

export default router;

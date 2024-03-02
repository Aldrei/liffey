import { User } from "@/database/create";
import { router } from "@/express.instance";
import { Request, Response } from "express";


router.post('/users',
  async (req: Request, res: Response) => {

  const newUser = await User.create({ 
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    username: req.body.username, 
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
  const users = await User.findAll()

  res.send({
    message: '',
    data: users
  });
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

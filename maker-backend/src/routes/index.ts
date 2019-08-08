import { Router, Request, Response } from 'express';
import { UserModel } from '@models';

const router = Router();

router.get('/hello', async (req: Request, res: Response) => {
  res.status(201).json({
    env: process.env.NODE_ENV,
    message: 'success /hello request',
  });
});

router.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    env: process.env.NODE_ENV,
    message: 'success',
  });
});

export default router;

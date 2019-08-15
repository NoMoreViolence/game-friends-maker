import { Router, Request, Response } from 'express';
import { UserModel } from '@models';
import { signRouter } from '@routes/sign';

const router = Router();

router.use('/sign', signRouter);

export default router;

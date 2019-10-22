import { Router } from 'express';
import { login, register, check } from './controller';
import { tokenCheckMiddleware } from '@middlewares/token-check';

const signRouter = Router();

signRouter.post('/up/google', register);
signRouter.post('/in/google', login);
signRouter.use('/check', tokenCheckMiddleware);
signRouter.get('/check', check);

export { signRouter };

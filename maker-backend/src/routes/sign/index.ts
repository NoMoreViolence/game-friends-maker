import { Router } from 'express';
import { login } from './controller';

const signRouter = Router();

signRouter.get('/check');
signRouter.post('/up/google');
signRouter.post('/in/google', login);

export { signRouter };

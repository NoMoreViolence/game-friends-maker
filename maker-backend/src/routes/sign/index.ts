import { Router } from 'express';
import { login, register } from './controller';

const signRouter = Router();

signRouter.get('/check');
signRouter.post('/up/google', register);
signRouter.post('/in/google', login);

export { signRouter };

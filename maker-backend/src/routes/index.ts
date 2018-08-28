import * as express from 'express';
const Router = express.Router();

import { auth } from './auth';

Router.use('/auth', auth);

export default Router;

import * as express from 'express';
const Router = express.Router();

import auth from './auth';

Router.use('/auto', auth);

export default Router;

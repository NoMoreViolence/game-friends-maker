import * as express from 'express';
const Router = express.Router();

import admin from './admin';
import auth from './auth';
import api from './public-api';
import user from './user';

Router.use('/admin', admin);
Router.use('/auth', auth);
Router.use('/user', user);
Router.use('/api', api);

export default Router;

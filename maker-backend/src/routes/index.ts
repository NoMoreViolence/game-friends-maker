import * as express from 'express';
const Router = express.Router();

import admin from './admin';
import auth from './auth';
import game from './game';
import user from './user';

Router.use('/admin', admin);
Router.use('/auth', auth);
Router.use('/game', game);
Router.use('/user', user);

export default Router;

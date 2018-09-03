import * as express from 'express';
const Router = express.Router();

import auth from './auth';
import game from './game';
import user from './user';

Router.use('/auth', auth);
Router.use('/game', game);
Router.use('/user', user);

export default Router;

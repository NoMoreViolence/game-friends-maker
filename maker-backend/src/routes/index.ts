import * as express from 'express';
const Router = express.Router();

import auth from './auth';
import game from './game';

Router.use('/auth', auth);
Router.use('game', game);

export default Router;

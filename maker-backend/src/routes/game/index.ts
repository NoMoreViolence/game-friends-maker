import * as express from 'express';
import * as Controller from './game.controller';

const Router = express.Router();

Router.get('/:game', Controller.getGame);
Router.get('', Controller.getAllGame);

export default Router;

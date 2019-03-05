import * as express from 'express';
import * as Controller from './public-api.controller';

const Router = express.Router();

Router.get('/games/:game', Controller.getGame);
Router.get('/games', Controller.getAllGame);

Router.get('/genre/:genre');
Router.get('/genre', Controller.getAllGenre);

export default Router;

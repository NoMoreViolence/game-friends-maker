import * as express from 'express';
import * as Controller from './public-api.controller';

const Router = express.Router();

Router.get('/game/:game', Controller.getGame);
Router.get('/game', Controller.getAllGame);

Router.get('/genre/:genre');
Router.get('/genre');

export default Router;

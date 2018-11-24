import * as express from 'express';
import * as controller from './admin.controller';
import middleware from 'src/middleware';

const Router = express.Router();

Router.use('/game/:gamename', middleware.checkAdminToken); // Game Add
Router.post('/game/:gamename', controller.addGame);
Router.use('/game/:gamename', middleware.checkAdminToken); // Game Change
Router.patch('/game/:gamename', controller.changeGame);
Router.use('/game/:gamename', middleware.checkAdminToken); // Game delete
Router.delete('/game/:gamename', controller.deleteGame);

Router.use('/genre/:genre', middleware.checkAdminToken); // Add game genre
Router.post('/genre/:genre', controller.addGenre);
Router.use('/genre/:genre', middleware.checkAdminToken); // Change game genre
Router.patch('/genre/:genre', controller.changeGenre);
Router.use('/genre/:genre', middleware.checkAdminToken); // Delete game genre
Router.delete('/genre/:genre', controller.deleteGenre);

export default Router;

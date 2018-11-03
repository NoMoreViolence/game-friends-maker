import * as express from 'express';
import * as controller from './admin.controller';
import middleware from 'src/middleware';

const Router = express.Router();

// Game Add
Router.use('/game/:gamename', middleware.checkAdminToken);
Router.post('/game/:gamename', controller.addGame);
// Game Change
Router.use('/game/:gamename', middleware.checkAdminToken);
Router.patch('/game/:gamename', controller.changeGame);
// Game delete
Router.use('/game/:gamename', middleware.checkAdminToken);
Router.delete('/game/:gamename', controller.deleteGame);

// Add game genre
Router.use('/genre/:genre', middleware.checkAdminToken);
Router.post('/genre/:genre', controller.addGenre);
// Change game genre
Router.use('/genre/:genre', middleware.checkAdminToken);
Router.patch('/genre/:genre', controller.changeGenre);
// Delete game genre
Router.use('/genre/:genre', middleware.checkAdminToken);
Router.delete('/genre/:genre', controller.deleteGenre);

export default Router;

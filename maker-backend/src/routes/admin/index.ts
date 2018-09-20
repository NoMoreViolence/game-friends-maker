import * as express from 'express';
import * as controller from './admin.controller';
import middleware from 'src/middleware';

const Router = express.Router();

// Game Add
Router.use('/game/:gamename', middleware.checkCookie);
Router.post('/game/:gamename', controller.addGame);
// Game Change
// Router.patch('/game/:game', controller.gameChange);
// Game delete
// Router.delete('/game/:game', controller.gameDelete);

export default Router;

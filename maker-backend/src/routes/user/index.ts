import * as express from 'express';
import * as controller from './user.controller';
import middleware from 'src/middleware';

const Router = express.Router();

Router.use('/username', middleware.checkCookie);
Router.patch('/username', controller.changeUsername);

export default Router;

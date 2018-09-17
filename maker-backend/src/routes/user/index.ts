import * as express from 'express';
import * as controller from './user.controller';
import middleware from 'src/middleware';

const Router = express.Router();

Router.use('/change/password', middleware.checkCookie);
Router.patch('/change/password', controller.changeUserPassword);

Router.use('/change/:what', middleware.checkCookie);
Router.patch('/change/:what', controller.changeUserInfo);

export default Router;

import * as express from 'express';
import * as controller from './user.controller';
import middleware from 'src/middleware';

const Router = express.Router();

// Change password
Router.use('/change/password', middleware.checkCookie);
Router.patch('/change/password', controller.changeUserPassword);

// Change Username & Email
Router.use('/change/:what', middleware.checkCookie);
Router.patch('/change/:what', controller.changeUserInfo);

// Send email verify code
Router.use('/email', middleware.checkCookie);
Router.get('/email', controller.requestEmailVerifyCode);

// Check email verify code
Router.use('/email', middleware.checkCookie);
Router.post('/email', controller.checkEmailVerifyCode);

export default Router;

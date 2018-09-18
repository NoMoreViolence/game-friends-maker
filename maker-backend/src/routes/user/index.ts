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
Router.use('/mail', middleware.checkCookie);
Router.get('/mail', controller.requestEmailVerifyCode);

// Check email verify code
Router.use('/mail', middleware.checkCookie);
Router.post('/mail', controller.checkEmailVerifyCode);

export default Router;

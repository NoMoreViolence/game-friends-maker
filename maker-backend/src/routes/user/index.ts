import * as express from 'express';
import * as controller from './user.controller';
import middleware from 'src/middleware';

const Router = express.Router();

// Check email verify code
Router.use('/email', middleware.checkCookie);
Router.post('/email', controller.checkEmailVerifyCode);

// Send email verify code
Router.use('/email', middleware.checkCookie);
Router.get('/email', controller.requestEmailVerifyCode);

// Change password
Router.use('/password', middleware.checkCookie);
Router.patch('/password', controller.changeUserPassword);

// Change Username & Email
Router.use('/:what', middleware.checkCookie);
Router.patch('/:what', controller.changeUserInfo);

export default Router;

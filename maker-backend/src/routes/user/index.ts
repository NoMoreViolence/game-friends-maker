import * as express from 'express';
import * as controller from './user.controller';
import middleware from 'src/middleware';

const Router = express.Router();

// Check email verify code
Router.use('/email', middleware.checkUserCookie);
Router.post('/email', controller.checkEmailVerifyCode);

// Send email verify code
Router.use('/email', middleware.checkUserCookie);
Router.get('/email', controller.requestEmailVerifyCode);

// Change password
Router.use('/password', middleware.checkUserCookie);
Router.patch('/password', controller.changeUserPassword);

// Change Username & Email
Router.use('/:what', middleware.checkUserCookie);
Router.patch('/:what', controller.changeUserInfo);

export default Router;

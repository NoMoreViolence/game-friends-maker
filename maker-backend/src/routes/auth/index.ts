import * as express from 'express';
import * as controller from './auth.controller';
import middleware from 'src/middleware';

const Router = express.Router();

Router.get('/duplication/:what', controller.checkDuplication); // duplication check
Router.post('/register', controller.register); // Register

Router.post('/login', controller.login); // Login

Router.use('/check', middleware.checkUserToken); // Auto Login
Router.post('/check', controller.check);

Router.use('/withdraw', middleware.checkUserToken); // Withdraw
Router.get('/withdraw', controller.withdraw);

Router.use('/email', middleware.checkUserToken); // Send email verify code
Router.get('/email', controller.requestEmailVerifyCode);

Router.use('/email', middleware.checkUserToken); // Check email verify code
Router.post('/email', controller.checkEmailVerifyCode);

Router.use('/password', middleware.checkUserToken); // Change password
Router.patch('/password', controller.changeUserPassword);

Router.use('/:what', middleware.checkUserToken); // Change Username & Email
Router.patch('/:what', controller.changeUserInfo);

export default Router;

import * as express from 'express';
import * as controller from './auth.controller';
import middleware from 'src/middleware';

const Router = express.Router();

// duplication check
Router.get('/duplication/:what', controller.checkDuplication);
// Register
Router.post('/register', controller.register);
// Login
Router.post('/login', controller.login);
// Auto Login
Router.use('/check', middleware.checkUserCookie);
Router.post('/check', controller.check);
// Withdraw
Router.use('/withdraw', middleware.checkUserCookie);
Router.get('/withdraw', controller.withdraw);

export default Router;

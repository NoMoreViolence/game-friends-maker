import * as express from 'express';
import * as controller from './auth.controller';
import middleware from 'src/middleware';

const Router = express.Router();

Router.get('/duplication', controller.checkDuplication); // username, email duplication check api

Router.post('/register', controller.register); // Register

Router.post('/login', controller.login); // Login

Router.use('/check', middleware.checkCookie);
Router.post('/check', controller.check); // Auto Check

export default Router;

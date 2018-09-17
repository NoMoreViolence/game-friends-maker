import * as express from 'express';
import * as controller from './auth.controller';
import middleware from 'src/middleware';

const Router = express.Router();

Router.get('/duplication/:what', controller.checkDuplication); // username, email duplication check api

Router.post('/register', controller.register); // Register

Router.post('/login', controller.login); // Login

Router.use('/check', middleware.checkCookie); // First loading token check
Router.post('/check', controller.check); // First loading token check

export default Router;

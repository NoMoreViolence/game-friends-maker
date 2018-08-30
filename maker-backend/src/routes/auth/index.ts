import * as express from 'express';
import * as controller from './auth.controller';
import middelware from 'src/middleware';

const Router = express.Router();

Router.use('/duplication', middelware.checkUserInfoMiddleware); // username, email duplication check api
Router.get('/duplication', controller.checkDuplication); // username, email duplication check api

Router.post('/register', controller.register); // Register
Router.post('/login', controller.login); // Login

export { Router as auth };

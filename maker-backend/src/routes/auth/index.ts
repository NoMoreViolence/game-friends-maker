import * as express from 'express';
import * as controller from './auth.controller';

const Router = express.Router();

Router.get('/email', controller.CheckEmail);
// router.get('/register', controller.register); // Register
// router.post('/login', controller.login); // Login
// router.post('/check', controller.check); // Token Check
export { Router as auth };

import * as express from 'express';
import * as controller from './auth.controller';
import middelware from 'src/middleware';

const Router = express.Router();

Router.use('/duplication', middelware.checkUserInfoMiddleware);
Router.get('/duplication', controller.checkDuplication);

Router.post('/register', controller.register);
// Router.get('/email', controller.CheckEmail);

// router.get('/register', controller.register); // Register
// router.post('/login', controller.login); // Login
// router.post('/check', controller.check); // Token Check
export { Router as auth };

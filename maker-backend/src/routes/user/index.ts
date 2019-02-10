import * as express from 'express';
import * as controller from './user.controller';
import middleware from 'src/middleware';

const Router = express.Router();

Router.get('/profile/:username', controller.getProfile);

Router.use('/profile/upload', middleware.checkUserToken);
Router.post('/profile/upload', controller.profileImageUpload);

Router.use('/profile', middleware.checkUserToken);
Router.get('/profile', controller.getMyProfile);

Router.use('/profile', middleware.checkUserToken);
Router.patch('/profile', controller.changeMyProfile);

export default Router;

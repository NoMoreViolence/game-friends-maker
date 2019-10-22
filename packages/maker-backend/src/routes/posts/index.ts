import { Router } from 'express';
import { tokenCheckMiddleware } from '@middlewares';

import { readPosts } from './controller';

const postRouter = Router();

postRouter.use('/', tokenCheckMiddleware);
postRouter.get('/', readPosts);

export { postRouter };

import { Router } from 'express';

import { readPosts, createPosts } from './controller';

const postRouter = Router();

postRouter.get('/', readPosts);
postRouter.post('/', createPosts);

export { postRouter };

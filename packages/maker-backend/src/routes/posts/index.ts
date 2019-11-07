import { Router } from 'express';

import { readPosts, createPost, updatePost } from './controller';

const postRouter = Router();

postRouter.get('/', readPosts);
postRouter.post('/', createPost);
postRouter.put('/', updatePost);

export { postRouter };

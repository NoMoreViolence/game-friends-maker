import { Router } from 'express';
import { tokenCheckMiddleware } from '@middlewares';
import { signRouter } from '@routes/sign';
import { postRouter } from '@routes/posts';

const router = Router();

router.use('/sign', signRouter);

router.use('/posts', tokenCheckMiddleware);
router.use('/posts', postRouter);

export default router;

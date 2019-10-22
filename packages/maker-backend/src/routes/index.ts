import { Router } from 'express';
import { signRouter } from '@routes/sign';
import { postRouter } from './posts';

const router = Router();

router.use('/sign', signRouter);
router.use('/posts', postRouter);

export default router;

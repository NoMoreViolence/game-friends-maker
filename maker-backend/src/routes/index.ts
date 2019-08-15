import { Router } from 'express';
import { signRouter } from '@routes/sign';

const router = Router();

router.use('/sign', signRouter);

export default router;

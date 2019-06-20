import express from 'express';
import authRouter from './authRouter';
import loginRouter from './loginRouter';
const router = express.Router();
import {apiToken} from '../../middlewares/apiMiddleware';

router.use('/users', apiToken, authRouter);
router.use('/', loginRouter);

module.exports = router;

import express from 'express';
import homeRouter from './homeRouter';
import propertiesRouter from './propertiesRouter';
import authRouter from './authRouter';
const router = express.Router();

router.use('/', homeRouter);
router.use('/', authRouter);
router.use('/properties', propertiesRouter);

module.exports = router;

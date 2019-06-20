import express from 'express';
import { getAllProperties } from '../controllers/propertiesController';
const router = express.Router();

router.get('/', getAllProperties);

module.exports = router;
import express from 'express';
import AuthController from '../../controllers/api/authController';
const router = express.Router();
import authValidation from '../../validations/auth';
import {apiToken} from '../../middlewares/apiMiddleware';

router.put('/:userId/update', authValidation('update-profile'), AuthController.updateProfile);

module.exports = router;
import express from 'express';
import loginController from '../../controllers/api/loginController';
const router = express.Router();
import authValidation from '../../validations/auth';

//Login
router.post('/login', authValidation('login'), loginController.actionLogin);
//Register
router.post('/register', authValidation('register'), loginController.register);

module.exports = router;
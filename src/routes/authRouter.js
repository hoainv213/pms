import express from 'express';
import AuthController from '../controllers/authController';
import authValidation from '../validations/auth';
const router = express.Router();
const { forwardAuthenticated } = require('../middlewares/auth');

//Login
router.get('/login', forwardAuthenticated, AuthController.showFormLogin);

router.post('/login',
  authValidation('login'),
  AuthController.actionLogin);

//Logout
router.get('/logout', AuthController.actionLogout);


module.exports = router;
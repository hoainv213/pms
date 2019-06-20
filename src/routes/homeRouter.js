import express from 'express';
import HomeController from '../controllers/homeController';
import {ensureAuthenticated, forwardAuthenticated} from '../middlewares/auth';
const router = express.Router();

router.get('/', forwardAuthenticated, HomeController.getHome);
router.get('/dashboard', ensureAuthenticated, HomeController.getDashboard);

module.exports = router;
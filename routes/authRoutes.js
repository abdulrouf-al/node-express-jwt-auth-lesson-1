const { Router } = require('express');
const authController = require('../controllers/authController');
const User = require('../models/User');
const {isLoggedIn} = require('../middleware/authMiddleware');
const passport = require("passport");

const router = Router();

 router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login',  authController.login_get);
router.post('/login',  authController.login_post); 

router.get('/logout',isLoggedIn, authController.logout_get); 

module.exports = router;
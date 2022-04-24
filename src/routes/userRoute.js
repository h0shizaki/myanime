const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller')

router.get('/login' , UserController.LoginPage)
router.get('/register' , UserController.RegisterPage) 


module.exports = router;
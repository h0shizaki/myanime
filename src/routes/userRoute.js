const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller')

router.get('/login' , UserController.LoginPage)
router.post('/login' , UserController.Login)
router.get('/register' , UserController.RegisterPage) 
router.post('/register' , UserController.Register)

module.exports = router;
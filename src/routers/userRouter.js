const UserController = require('../controllers/user.controller')
const express = require('express');
const router = express.Router();

router.post('/login' , UserController.Login)
router.post('/register' , UserController.PostUser)

module.exports = router ;
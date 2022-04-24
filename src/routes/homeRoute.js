const homeController = require('../controllers/home.controller')
const express = require('express');
const router = express.Router();

router.get('/', homeController.Index)
router.get('/home', homeController.Home)

module.exports = router;
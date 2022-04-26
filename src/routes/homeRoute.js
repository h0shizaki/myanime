const homeController = require('../controllers/home.controller')
const middleware = require('../middlewares/index')
const express = require('express');
const router = express.Router();

router.get('/', homeController.Index)
router.get('/home', middleware, homeController.Home)

module.exports = router;
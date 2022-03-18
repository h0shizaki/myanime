const { alertMiddleware } = require('../middlewares/auth')
const express = require('express');
const router = express.Router();


const apiController = require('../controllers/api.controller')

router.get('/series', alertMiddleware, apiController.GetSeries);
router.post('/series', alertMiddleware, apiController.PostSeries);

module.exports = router;
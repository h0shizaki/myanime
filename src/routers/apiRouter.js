const { alertMiddleware,checkAuth } = require('../middlewares')
const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller')

router.get('/series', alertMiddleware, apiController.GetSeries);
router.post('/series', checkAuth, apiController.PostSeries);



module.exports = router;
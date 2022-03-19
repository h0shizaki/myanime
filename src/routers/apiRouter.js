const { alertMiddleware } = require('../middlewares/auth')
const express = require('express');
const router = express.Router();
const upload = require('../utilities/upload');

const apiController = require('../controllers/api.controller')

router.get('/series', alertMiddleware, apiController.GetSeries);
router.post('/series', alertMiddleware, apiController.PostSeries);

router.post('/uploadImg', apiController.UploadImage);

module.exports = router;
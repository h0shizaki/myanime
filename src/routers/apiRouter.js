const { alertMiddleware,checkAuth } = require('../middlewares')
const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller')

router.get('/series',  apiController.GetAllSeries);
router.get('/series/:id' , apiController.GetOneSeries);
router.post('/series', checkAuth, apiController.PostSeries);
router.put('/series/update' , checkAuth , apiController.UpdateSeries)


module.exports = router;
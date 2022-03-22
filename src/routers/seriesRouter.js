const { alertMiddleware, checkAuth } = require('../middlewares')
const express = require('express');
const router = express.Router();

const apiSeriesController = require('../controllers/series.controller')

router.get('/', checkAuth, apiSeriesController.GetAllSeries);
router.get('/:id', apiSeriesController.GetOneSeries);
router.post('/', checkAuth, apiSeriesController.PostSeries);
router.put('/', checkAuth, apiSeriesController.UpdateSeries);
router.delete('/delete/:id', checkAuth, apiSeriesController.DeleteSeries);


module.exports = router;
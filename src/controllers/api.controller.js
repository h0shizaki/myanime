const seriesModel = require('../models/series.model')
const Series = require('../models/series.model');
class API {

    async GetSeries(req, res) {

        Series.getSeries( async(err, series) => {
            if (err) {
                // console.error(err)
                res.json({ "status": "error", "message": err.message }).status(500)
            } else {
                // console.log(series);
                res.status(200).json({ "status": "OK", series })
            }

        })

    }

    async PostSeries(req, res) {
        const { name, episodes, premiered, source, studio } = req.body;

        const payload = new Series({
            name,
            episodes,
            premiered,
            source,
            studio
        })

        Series.addSeries(payload , (err,response)=>{
            if (err) {
                // console.error(err)
                res.json({ "status": "error", "message": err.message }).status(500)
            }else{
                // console.log(response)
                res.json({ "status": "OK", response })
            }

        })

    }
}

const apiController = new API();

module.exports = apiController;
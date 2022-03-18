const { connectToDB, insertToDB, findAll } = require('../connection/connection')
const seriesModel = require('../models/series.model')
class API {

    async GetSeries(req, res) {
        const response = await findAll(seriesModel);
        res.status(200).json({ "status": "OK", response })
    }

    async PostSeries(req, res) {
        const { name, episodes, premiered, source, studio } = req.body;

        const payload = {
            name,
            episodes,
            premiered,
            source,
            studio
        }

        try{
            const response = await insertToDB(payload, seriesModel);
            res.json({ "status": "OK", response })

        }catch(err){
            res.json({"status":"error", "message":err.message}).status(500)
        }
    }
}

const apiController = new API();

module.exports = apiController;
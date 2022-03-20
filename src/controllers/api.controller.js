const Series = require('../models/series.model');
const upload = require('../utilities/upload').single('file');
class API {

    async GetSeries(req, res) {

        Series.getSeries(async (err, series) => {
            if (err) {
                // console.error(err)
                res.json({ "status": "error", "message": err.message }).status(500)
                return;
            } else {
                // console.log(series);
                res.status(200).json({ "status": "OK", series })
            }

        })

    }

    async PostSeries(req, res) {
        try {
            upload(req, res, (err) => {
                if (err) {
                    res.status(400).send({ "status": "fail", "message": err.message });
                    return;
                }
                else {

                    const { name, description, episodes, premiered, source, studio } = req.body;

                    //check image was uploaded or not if not set empty string
                    const thumbnail = req.file === undefined? '' : req.file.filename ;
                    console.log(req.file.path)
                    const payload = new Series({
                        name,
                        description,
                        episodes,
                        premiered,
                        source,
                        studio,
                        thumbnail
                    })

                    Series.addSeries(payload, (err, response) => {
                        if (err) {
                            res.json({ "status": "error", "message": err.message }).status(500)
                            return;
                        } else {
                            res.json({ "status": "OK", response })
                        }

                    })

                    // res.status(200).json({ "message": "OK", "data": req.file })
                }
            })
        } catch (err) {
            res.json({ "status": "error", "message": err.message }).status(500)
            return;
        }

    }
}

const apiController = new API();

module.exports = apiController;
const Series = require('../models/series.model');
const upload = require('../utilities/upload').single('file');
const fs = require('fs');
const path = require('path');
class API {

    async GetAllSeries(req, res) {

        Series.getSeries(async (err, series) => {
            if (err) {
                // console.error(err)
                return res.json({ "status": "error", "message": err.message }).status(500)

            } else {
                // console.log(series);
                return res.status(200).json({ "status": "OK", series })
            }

        })

    }

    async GetOneSeries(req, res) {
        try {
            const filter = {
                _id: req.params.id
            }
            Series.getOneSeries(filter, async (err, series) => {
                if (err) {
                    // console.error(err)
                    return res.json({ "status": "error", "message": err.message }).status(500)

                } else {
                    // console.log(series);
                    return res.status(200).json({ "status": "OK", series })
                }

            })

        } catch (err) {
            return res.json({ "status": "error", "message": "Invalid object id" }).status(400)
        }


    }

    async PostSeries(req, res) {
        try {
            upload(req, res, (err) => {
                if (err) {
                    return res.status(400).send({ "status": "fail", "message": err.message });

                }
                else {

                    const { name, description, episodes, premiered, source, studio } = req.body;

                    //check image was uploaded or not if not set empty string
                    const thumbnail = req.file === undefined ? '' : req.file.filename;
                    // console.log(req.file.path)
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
                            return res.json({ "status": "error", "message": err.message }).status(500)

                        } else {
                            return res.json({ "status": "OK", response })
                        }

                    })

                    // res.status(200).json({ "message": "OK", "data": req.file })
                }
            })
        } catch (err) {
            return res.json({ "status": "error", "message": err.message }).status(500)

        }

    }

    async UpdateSeries(req, res) {
        // console.log(req.body)
        try {
            upload(req, res, (err) => {
                if (err) {
                    return res.status(400).send({ "status": "fail", "message": err.message });
                } else {

                    const id = req.body._id;
                    const { name, description, episodes, premiered, source, studio } = req.body;

                    if (req.file !== undefined) {
                        const thumbnail = req.file.filename;

                        const payload = {
                            name,
                            description,
                            episodes,
                            premiered,
                            source,
                            studio,
                            thumbnail
                        }

                        Series.upadteSeries(id, payload, (err, response) => {
                            if (err) {
                                return res.json({ "status": "error", "message": err.message }).status(500)

                            } else {
                                //update success -> remove old image 
                                const oldImgPath = path.join(__basedir, '/src/public/assets/uploads', response.thumbnail)
                                fs.unlink(oldImgPath, (err) => {
                                    if (err) return res.json({ "status": "error", "message": err.message }).status(500);
                                })
                                return res.json({ "status": "OK", })
                            }

                        })

                    } else {
                        const payload = {
                            name,
                            description,
                            episodes,
                            premiered,
                            source,
                            studio
                        }

                        Series.upadteSeries(id, payload, (err, response) => {
                            if (err) {
                                return res.json({ "status": "error", "message": err.message }).status(500)

                            } else {
                                return res.json({ "status": "OK", })
                            }

                        })


                    }



                }
            })
        } catch (err) {
            return res.json({ "status": "error", "message": err.message }).status(500)
        }
    }
}

const apiController = new API();

module.exports = apiController;
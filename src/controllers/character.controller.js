const Series = require('../models/series.model');
const Characters = require('../models/characters.model');
const upload = require('../utilities/uploadCharacters').single('file');
const fs = require('fs');
const path = require('path');

class CharacterApi {

    async PostChracter(req, res) {
        try {
            upload(req, res, (err) => {
                if (err) {
                    // console.log(req.file)
                    return res.status(400).send({ "status": "fail", "message": err.message });
                } else {
                    const { seriesId } = req.body;
                    const { name, age, birthday, height, description, voiceactor } = req.body;


                    const image = req.file === undefined ? '' : req.file.filename;

                    const payload = new Characters({
                        name,
                        age,
                        birthday,
                        height,
                        description,
                        image,
                        voiceactor
                    })

                    Characters.addCharacter(payload, (err, response) => {
                        if (err) {
                            return res.json({ "status": "error", "message": err.message }).status(500)

                        } else {
                            //add character to series 
                            console.log(response._id);

                            Series.updateCharacter(seriesId, response._id, (err2) => {
                                if (err2) {
                                    console.log("Error while update characters")
                                    return res.json({ "status": "error", "message": err2.message }).status(500)
                                }
                            })

                            return res.json({ "status": "OK", response })
                        }

                    })

                }

            })

        } catch (err) {
            return res.json({ "status": "error", "message": err.message }).status(500)
        }
    }

    async GetCharacterById(req, res) {

        try {
            const filter = {
                _id: req.params.id
            }
            Characters.getCharacterById(filter, async (err, series) => {
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

    DeleteCharacter(req, res) {
        
    }

}


const apiCharacterController = new CharacterApi();

module.exports = apiCharacterController;
const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class UserController {

    async PostUser(req, res) {

        const { username, password } = req.body;
        console.log(username);
        // console.log(password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log(hashedPassword)

        const payload = {
            username,
            password: hashedPassword
        }

        Users.addUser(payload, (err, response) => {
            if (err) {
                return res.json({ "status": "error", "message": err.message }).status(500)
                
            } else {
                return res.json({ "status": "OK", response })
            }

        })
    }

    async Login(req, res) {
        const { username, password } = req.body;

        const filter = {
            username
        }

        Users.getUser(filter, async (err, response) => {
            if (err) {
                return res.json({ "status": "error", "message": err.message }).status(500)
                
            }
            if (!response) {
                return res.json({ "status": "fail", "message": "incorrect username or password" })
                
            }

            const dbPassword = response.password

            const validPassword = await bcrypt.compare(password, dbPassword);

            if (validPassword) {
                //Password correct
                const token = jwt.sign(
                    { _id: response._id  },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: "0.5h"
                    }
                )

                res.header('jwt', token)
                const data = {
                    'jwt': token,
                    ...response._doc
                }
                return res.json({ "status": "OK", data })

            } else {
                return res.json({ "status": "fail", "message": "incorrect username or password" })
            }

        })

    }

}

module.exports = new UserController();
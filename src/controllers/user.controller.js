const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');

class User {

    LoginPage(req,res) {
        res.render('login' , {message:''})
    }

    async Login(req,res) {
        const { username, password } = req.body;

        const filter = {
            username
        }
        
        Users.getUser(filter, async (err, response) => {
            if (err) {
                return res.json({ "status": "error", "message": err.message }).status(500)
                
            }
            if (!response) {
                return res.render('login', { 'message': "incorrect username or password"} )
                
            }
            const dbPassword = response.password
            const validPassword = await bcrypt.compare(password, dbPassword);

            if (validPassword) {
                req.session.isAuth = true
                return res.redirect('/home')
            } else {
                return res.render('login', { 'message': "incorrect username or password"} )
                // return res.json({ "status": "fail", "message": "incorrect username or password" })
            }
        })
    }

    RegisterPage(req, res) {
        res.render('register')
    }

    async Register(req, res) {

        const { username, password } = req.body;
        // console.log(username);
        // console.log(password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // console.log(hashedPassword)

        const payload = {
            username,
            password: hashedPassword
        }

        Users.addUser(payload, (err, response) => {
            if (err) {
                return res.json({ "status": "error", "message": err.message }).status(500)
                
            } else {
                req.session.isAuth = true
                return res.redirect('/home')
            }

        })
    }
}

const userController = new User() ;
module.exports = userController ;
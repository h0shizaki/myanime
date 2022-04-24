class User {

    LoginPage(req,res) {
        res.send("Login Page")
    }

    async(req,res) {
        res.send("Login")
    }

    RegisterPage(req, res) {
        res.send('Register Page')
    }

    async Register(req, res) {
        res.send('Register')
    }
}

const userController = new User() ;
module.exports = userController ;
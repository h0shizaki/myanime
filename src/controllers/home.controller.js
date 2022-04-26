class Home {

    Index(req, res) {
        res.render('index.ejs')
    }

    Home(req, res) {
        //use middleware 
        if(req.session.isAuth != true){
            return res.redirect('/user/login')
        }

        return res.render('home')
    }


}

const homeController = new Home();
module.exports = homeController;

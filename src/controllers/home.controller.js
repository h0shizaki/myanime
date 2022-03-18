class Home {
    
    async Index(req, res) {

        res.render('home.ejs', {
            title: "index"
        })
    }


}

const homeController = new Home();

module.exports = homeController;
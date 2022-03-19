class Home {
    
    async Index(req, res) {

        res.render('index.ejs', {
            title: "index"
        })
    }


}

const homeController = new Home();

module.exports = homeController;
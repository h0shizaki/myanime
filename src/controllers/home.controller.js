class Home {

    Index(req, res) {
        res.send("Hello")
    }

    Home(req, res) {
        //use middleware 
        res.send("HI")
    }


}

const homeController = new Home();
module.exports = homeController;

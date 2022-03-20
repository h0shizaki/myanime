const jwt = require('jsonwebtoken');
const FRONTEND_URL = process.env.FRONTEND_URL;

function enableCORS(req, res, next) {
    // console.log(FRONTEND_URL)
    res.header("Access-Control-Allow-Origin", `${FRONTEND_URL}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
}

function alertMiddleware(req, res, next) {
    // console.log('Request Type:', req.method)
    console.log("Middlewares is being used")
    // console.log(req.header('Cookie'))
    next()
}

function checkAuth(req, res, next) {
    const token = req.header('Authorization');
    if (!token || token === '') {
        res.status(403).json({ "status": "fail", "message": "Unauthorization" })

    } else {
        //have token 
        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET) ;
            req.user = decodedToken ;
            // console.log(decodedToken)
        } catch (err) {
            res.json({ "status": "fail", "message": "Invalid token" }).status(401)
            return ;
        }

        next()
    }
}

module.exports = { enableCORS, alertMiddleware, checkAuth };

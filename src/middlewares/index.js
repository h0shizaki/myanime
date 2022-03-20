
function alertMiddleware(req, res, next) {
    // console.log('Request Type:', req.method)
    console.log("Middlewares is being used")
    console.log(req.header('Cookie'))
    next()
}

function checkAuth(req, res, next) {
    if (req.header('Authorization') === '1234') {
        next()
    } else {
        res.status(401).json({ "status": "fail", "message": "Unauthorization" })
    }
}

module.exports = { alertMiddleware, checkAuth };

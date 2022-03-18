
function alertMiddleware(req, res, next) {
    // console.log('Request Type:', req.method)
    console.log("Middlewares is being used")
    next()
}

module.exports = { alertMiddleware };

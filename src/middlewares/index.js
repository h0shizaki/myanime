
const checkSession = (req,res,next) => {

    if( req.session.isAuth === undefined ) {
        return res.render('error' , {"error" : 'Unauthorized 401' })
    }
    
    next() ;

}

module.exports = checkSession ;
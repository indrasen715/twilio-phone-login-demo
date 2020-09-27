const jwt = require('jsonwebtoken')
constant=require('../config/credentials')
module.exports = (req, res, next) => {
    if (req.cookies.access_token != null) {
        try {
            const decoded = jwt.verify(req.cookies.access_token, constant.JWT_KEY)
            console.log(decoded)
            req.isLogin = true
            next()
        } catch (err) {
            console.log(err)

            req.isLogin = false
            next()
        }
    } else {
        req.isLogin = false
        next()
    }

}
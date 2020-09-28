const jwt = require('jsonwebtoken')
constant=require('../config/credentials')
module.exports = (req, res, next) => {
    if (req.cookies.access_token != null) {
        try {
            const decoded = jwt.verify(req.cookies.access_token, constant.JWT_KEY)
            req.isLogin = true
            next()
        } catch (err) {
            req.isLogin = false
            next()
        }
    } else {
        req.isLogin = false
        next()
    }

}
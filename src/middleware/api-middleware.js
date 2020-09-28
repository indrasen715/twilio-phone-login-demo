const jwt = require('jsonwebtoken')
constant=require('../config/credentials')
module.exports = (req, res, next) => {
    if (req.query.hasOwnProperty('access_token')) {
        if (req.query.access_token != '') {
            try {
                const decoded = jwt.verify(req.query.access_token, constant.JWT_KEY)
                req.UserId=decoded.UserId
                next()
            } catch (err) {
                return res.status(401).json({
                    Message: "Access Token is Invalid",
                    Description: "Your Access Token Is Invalid Please Use Valid Access Token",
                    IsAuthenticated: false
                })
            }
        } else {
            return res.status(401).json({
                Message: "Access Token Is Required Parameter",
                IsAuthenticated: false
            })
        }
    } else {
        return res.status(401).json({
            Message: "Access Token Is Required Parameter",
            IsAuthenticated: false
        })
    }
}
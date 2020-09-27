const User = require('../model/User')


var getUserByToken = (req, res, next) => {
    User.find({ _id: req.UserId }, { Password: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result < 1) {
                return res.json({
                    Message: "User Not Exist",
                    IsExist: false
                })
            }
            return res.status(200).json({
                Profile: result,
                IsExist: true
            })
        }).catch(err => {
            return res.json({
                error: err
            })
        })
}
var updateUserByToken = (req, res, next) => {
    User.update({ _id: req.UserId }, { Email: req.body.Email, Name: req.body.Name })
        .exec()
        .then(result => {
            return res.status(200).json({
                Profile: result,
                IsUpdated: true
            })
        }).catch(err => {
            return res.json({
                error: err
            })
        })
}

module.exports = { getUserByToken, updateUserByToken }
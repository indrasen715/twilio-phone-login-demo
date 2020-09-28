
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const constant = require('../config/credentials')
const client = require('twilio')(constant.ACCOUNT_SID, constant.AUTH_TOKEN);

/**
 *This function is used to Trigger Verification token using Twilio Verify Api
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var sendOtp = (req, res, next) => {
    client.verify.services(constant.SERVICE_ID)
        .verifications
        .create({ to: req.body.PhoneId, channel: 'sms' })
        .then(verification => {
            res.status(200).json({
                Sid: verification.sid,
                Status: verification.status,
                IsPosted: true

            })
        })
        .catch(error => {
            return res.json({
                IsPosted: false,
                error: error

            })
        });
}

/**
 * This function is used to verify user verification token and issue a JWT Token
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var verifyOtp = (req, res, next) => {
    client.verify.services(constant.SERVICE_ID)
        .verificationChecks
        .create({ to: req.body.PhoneId, code: req.body.Otp })
        .then(verification => {
            if (verification.valid) {
                User.find({ PhoneId: req.body.PhoneId })
                    .exec()
                    .then(user => {
                        if (user.length >= 1) {
                            var token = generateAcceeToken(user[0]);
                            res.cookie('access_token', token, { maxAge: 900000, httpOnly: true })
                            return res.status(200).json({
                                access_token: token,
                                IsAuthenticated: true,
                                OtpVerified: true
                            })
                        } else {
                            const payload = {
                                PhoneId: req.body.PhoneId,
                                PhoneVerified: true
                            }
                            const user = new User(payload);
                            user.save()
                                .then(user => {
                                    var token = generateAcceeToken(user);
                                    res.cookie('access_token', token, { maxAge: 900000, httpOnly: true })
                                    return res.status(200).json({
                                        access_token: token,
                                        IsAuthenticated: true,
                                        OtpVerified: true
                                    })
                                })
                                .catch(err => {
                                    return res.status(400).json({
                                        error: err
                                    })
                                })
                        }
                    })
            } else {
                return res.json({
                    IsAuthenticated: false,
                    OtpVerified: false

                })
            }


        })
        .catch(error => {
            return res.json({
                IsAuthenticated: false,
                OtpVerified: false,
                error: error

            })
        });
}

/**
 * This function is used to generate Jwt access token
 * @param {*} user
 * @return {*} 
 */
var generateAcceeToken = (user) => {
    const accessToken = jwt.sign({ PhoneId: user.PhoneId, UserId: user._id }, constant.JWT_KEY, { expiresIn: "1h" })
    return accessToken;
}


module.exports = { sendOtp, verifyOtp }
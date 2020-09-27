const express = require('express');
const router = express.Router()
router.get('/login', (req, res) => {
    if (req.isLogin) {
        return res.redirect('/profile')
    } else {
        return res.render('pages/login')
    }
})
router.get('/', (req, res) => {
    if (req.isLogin) {
        return res.redirect('/profile')
    } else {
         res.redirect('/login')
    }
})
router.get('/profile', (req, res) => {
    if (req.isLogin) {
        return res.render('pages/profile', { layout: 'profile-layout' })
    } else {
        return res.redirect('/login')
    }
})
router.get('/otpview', (req, res) => {
    res.render('pages/otp', { layout: 'popup' })
})
router.get('/updateProfileView', (req, res) => {
    res.render('pages/profile-update', { layout: 'popup' })
})
router.get('/logout', (req, res) => {
    res.clearCookie('access_token')
    res.clearCookie('first_name')
    res.clearCookie('email')
    res.clearCookie('uid')
    res.redirect('/login')
  })
module.exports = router;
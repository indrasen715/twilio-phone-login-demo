const express=require('express');
const router=express.Router()
const twilioController=require('../controller/Twilio')
router.post('/sendOtp',twilioController.sendOtp)
router.post('/verifyOtp',twilioController.verifyOtp)

module.exports=router;
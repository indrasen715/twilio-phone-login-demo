const express=require('express');
const router=express.Router()
const userController=require('../controller/User')
var apiMiddleware = require('../middleware/api-middleware')

router.get('/getProfile',apiMiddleware,userController.getUserByToken)
router.post('/updateProfile',apiMiddleware,userController.updateUserByToken)

module.exports=router;
const mongoose = require('mongoose')
const constant=require('../src/config/credentials')
mongoose.connect(constant.MONGODB_CONNECTION_STRING,{ useUnifiedTopology: true,useNewUrlParser: true }).then(success => {
    console.log('success')
}).catch(error => { console.log(error); })
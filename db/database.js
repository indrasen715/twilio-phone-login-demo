const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://test:hOJ8hnZe58Qi3nSb@cluster0.h9lga.mongodb.net/users?retryWrites=true&w=majority",{ useUnifiedTopology: true,useNewUrlParser: true }).then(success => {
    console.log('success')
}).catch(error => { console.log(error); })
require('./db/database')
const port=process.env.PORT||3000;
const express=require('express')
const exphbs = require('express-handlebars')
const app=express()
var cookieParser = require('cookie-parser')
const session = require('express-session')
var bodyParser = require('body-parser')
const viewRouter=require('./src/router/ViewRouter')
const twilioRouter=require('./src/router/Twilio')
const userRouter=require('./src/router/User')
var authMiddleware = require('./src/middleware/auth-middleware')
app.use(cookieParser());
app.use(session({
  secret: 'jkshkjsh',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 900000
  }
}))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// Use handlebars view engine
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
// create application/json parser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
//phone login routes
app.use('/',authMiddleware,viewRouter)
//twilio authentication Api
app.use('/api/twilio',twilioRouter)
//user profile Api
app.use('/api',userRouter)


app.listen(port,()=>{
    console.log('Server Is running on port:'+port)
})
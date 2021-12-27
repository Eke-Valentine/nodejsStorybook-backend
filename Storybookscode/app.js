
const express= require('express');// our server
const dotenv= require('dotenv');// config controller
const connectDb= require('./config/db')// config environment
const morgan= require('morgan');// logs controller : foe every request morgan gives us the metod, requested route, time it takes, 
const exphbs = require('express-handlebars'); // templating controller :
const path = require('path');// helps link path easily
const  passport = require('passport')
const mongoose=require('mongoose')
const session = require('express-session'); // required for passport to work
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const bodyParser =require('body-parser')

//load config variables
dotenv.config({path:'./config/config.env'});

//passport config
 require('./config/passport')(passport);

 connectDb()

const PORT= 3000
const app= express()



//middle ware for submitting form  BODY PARSE
app.use(express.urlencoded({extended:false}))// to accept form data
app.use(express.json())// to accept JSON data


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const sessionConfig= {
    secret: 'keyboard cat',
    resave: false,// don't save seesion if no change was made
    saveUninitialized: false, // don't create a seesion until something is stored
    store:  MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        //mongooseConnection: mongoose.connection
         // save session for 14 days
})
}


app.use(session(sessionConfig))

//passport middlewares
app.use(passport.initialize())
app.use(passport.session())

app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))



//routes config 
app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT,console.log(`server running  on ${PORT}`))

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

// ths is important to create user. if not present it brings error cannot find property .id 
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


//Method override
app.use (methodOverride((req,res)=>{
    if(req.body && typeof req.body ==='object' &&'_method' in req.body){
        //look in urlencoded POST bodies and delete it 
        let method=req.body._method
        delete req.body._method
        return method
    }
}))



app.use(session(sessionConfig))

//passport middlewares
app.use(passport.initialize())
app.use(passport.session())

//set global var
app.use(function(req, res, next) {
    res.locals.user=req.user || null
    next()
})


app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))



//routes config 
app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT,console.log(`server running  on ${PORT}`))
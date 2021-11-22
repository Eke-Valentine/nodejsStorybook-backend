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


//load config variables
dotenv.config({path:'./config/config.env'});


// Passport config
require('./config/passport')(passport);

connectDb();

const app = express();
//middle ware for submitting form  BODY PARSE
app.use(express.urlencoded({extended:false}))// to accept form data
app.use(express.json())// to accept JSON data

//Method override
app.use (methodOverride((req,res)=>{
    if(req.body && typeof req.body ==='object' &&'_method' in req.body){
        //look in urlencoded POST bodies and delete it 
        let method=req.body._method
        delete req.body._method
        return method
    }
}))


// instantiate morgan which hanles our login if in development mode onlegacyfinish
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//handlebars helpers
const {formatDate, stripTags,truncate,editIcon,select }= require('./helpers/hbs');

 
//html template engine setup to show html on the browserr
//folder structiure fosr handlebars template
// views
//    layouts
//       main.hbs

app.engine('.hbs',exphbs({
    helpers:{formatDate,
         stripTags,
         truncate,
        editIcon,
    select},// to format the date on the webpage
    defaultLayout:'main',//the base  hbs file
    extname:'hbs'
}
)
); // the default layoutmus contain the {{{body}}} to display the other templates
app.set('view engine', '.hbs')

//sessions middlewre must be pput above passport  muiddleware


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

//set global var
app.use(function(req, res, next) {
    res.locals.user=req.user || null
    next()
})


// routes
app.use('/',require('./routes/index'));//routes more
app.use('',require('./routes/index2'))
app.use('/auth',require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

// define static folder for our images css js
//folder structiure for static files
// public
//    css
//       main.css
//    js
//       main.js
//    images
//       main.jpeg





app.use(express.static(path.join(__dirname, 'public')))


const PORT=4000;
 
app.listen(PORT, console.log(`server rumning at ${process.env.NODE_ENV} modeon port ${PORT}`));




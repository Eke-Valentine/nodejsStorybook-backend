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

dotenv.config({path:'./config/config.env'})

const app = express();
const router=express.Router()


connectDb() //connect databases
//middle ware for submitting form  BODY PARSE
app.use(express.urlencoded({extended:false}))// to accept form data
app.use(express.json())// to accept JSON data
require('./config/passport')(passport)


app.use(express.static(path.join(__dirname, '/public'))  )
//passport middlewares
app.use(passport.initialize())
app.use(passport.session())


// setting up handlebars
app.engine('.hbs',exphbs({
 defaultLayout:'main',
 extname:'hbs'   
}));
app.set('view engine','.hbs')

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

//


//app.use(express.)
const PORT=5001;
app.listen(PORT|| 5001, console.log(`server running at ${process.env.NODE_ENV} on ${PORT}`));
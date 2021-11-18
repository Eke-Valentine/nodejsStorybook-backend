const express= require('express');// our server
const dotenv= require('dotenv');// config controller
// const connectDb= require('./config/db')// config environment
const morgan= require('morgan');// logs controller : foe every request morgan gives us the metod, requested route, time it takes, 
const exphbs = require('express-handlebars'); // templating controller :
const path = require('path');// helps link path easily
const  passport = require('passport')
const mongoose=require('mongoose')
const session = require('express-session'); // required for passport to work
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')


const app = express();
const router=express.Router()
dotenv.config({path:'./config/configs.env'})

app.use(express.static(path.join(__dirname, '/public'))  )

// setting up handlebars
app.engine('.hbs',exphbs({
 defaultLayout:'main',
 extname:'hbs'   
}));
app.set('view engine','.hbs')

app.use('/', require('./routes/index'))

//

//app.use(express.)
const PORT=5000;
app.listen(PORT|| 5001, console.log(`server running at ${process.env.NODE_ENV} on ${PORT}`));
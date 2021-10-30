const express= require('express');// our server
const dotenv= require('dotenv');// config controller
const connectDb= require('./config/db')// config environment
const morgan= require('morgan');// login controller
const exphbs = require('express-handlebars');

//load config

dotenv.config({path:'./config/config.env'});

connectDb();

const app = express();

// instantiate morgan which hanles our login if in development mode onlegacyfinish
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


//handlers

app.engine('.hbs',exphbs({defaultLayout:'main',extname:'hbs'}));
app.set('view engine', '.hbs')

// routes
app.use('/',require('./routes/index'))


const PORT=4000;

app.listen(PORT, console.log(`server rumning at ${process.env.NODE_ENV} modeon port ${PORT}`));
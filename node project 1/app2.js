// importing express classs
const Express = require('express')

//importing varible controller dotenv = express
const dotenv= require('dotenv');


// importing mongodb connection
const connectMyDB= require('./config/db2')

//showing app.js where the config file is 
dotenv.config({path:"./config/config.env"})

connectMyDB()

// instantiating an object of express classes
const apps=Express()



port= 7000;
apps.listen(port,console.log(`server runnign at ${port}`));
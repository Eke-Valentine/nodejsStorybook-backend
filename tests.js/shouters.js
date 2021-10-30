const  shouters  = require("./index")

const shout= new shouters();

//defining a call

shout.on("shout",(arg)=> console.log("listened to ",arg))


shout.print("boss of life")
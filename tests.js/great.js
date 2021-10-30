
//
// alwasy use const to load a module
const path=require('path');
const logger= require ('./index')
const os=require('os');
const fs=require('fs')
const EventEmitter = require('events');



logger.sayHello("Great")
logger.sayHi("boobs")

console.log("this is dirname" + __dirname);
console.log("this is filename"+ __filename)



// to export i can use 1
 // module.exports = function name/ variavle name
 // module.exports.function name = function name/ variable name
 // exports.function name = function name/ variable name0  


 //path module
// to divide the current filena,e intpo several units 
 const pathObj=path.parse(__filename);
 console.log(pathObj);

 // os module
const totalMemory= os.totalmem();
const freemomry= os.freemem()


console.log(`total nmemory ${totalMemory}`);
console.log(`free memory ${freemomry}`); 

// file system 
// readdirSync  is synchronous file reading method not advisable becuse the single thread of  od would be kept waiting and not attend to other customers 
//readdirSync gives all the fileas and folders present in the current directory  

//const fileRead= fs.readdirSync('./');
// console.log(`files and folders in the directory are ${fileRead}`);

// readdir  isa synchronous file reading method is advisable becuse the single thread of  would not be kept waiting and not attend to other customers 
//readdir gives all the fileas and folders present in the current directory  
//it has a callback function which receives two args error and the result of the files present

fs.readdir('./',(err,files)=>{
if (err) console.log(`errro ${err}`)
else console.log(`files and folders in the directory are ${files}`)
})


// event emitter 
//registering an event
const emitter= new EventEmitter();

emitter.on('messageLogged',(arg)=> console.log(`Listener   called`, arg));

//raiseing / triggering an event
emitter.emit('messageLogged',{id:1,url:"https://"});


// exercise


// const EventEmitter=require ('events')

const logEvent = new EventEmitter()

logEvent.on('logging', (arg)=> console.log("event logged",arg));

logEvent.emit("logging",{id:1,data:"message",url:"http;//"})

 
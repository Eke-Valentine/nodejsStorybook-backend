//creating a module

function sayHello (name){
console.log("hello"+ name);

}


function sayHi(names){
console.log ("hi"+ names);
}


// sayHello("Val");
//exporting a module 
module.exports.sayHello=sayHello;
module.exports.sayHi=sayHi;

// events

const EventEmitter= require('events');

class loggers extends EventEmitter {
 
 //method 
    log (arg) {
console.log(arg)

this.emit('messages',{id:1, url:' https://d'})
}

}

class shouters extends EventEmitter{

    print(args){
    console.log( `display ${args}`);

    this.emit('shout', {messgaes:"data", id:4,'url':'httP://HFYUH'});


}}

// http server 

const http=require('http');




 module.exports=loggers
module.exports=shouters

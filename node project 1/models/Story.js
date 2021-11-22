const mongoose= require('mongoose')

const StorySchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true //whitespace trim
},
body:{
    type:String,
    required:true
},
status:{
    type:String,
    default:'public',
    enum:['public','private']// List of possible values
},
user:{// lets us know who is logged in
    type:mongoose.Schema.Types.ObjectId,
    ref:'User', //connects this model to to the existing user model
   
},
createdAt:{
    type:Date,
    default:Date.now
}

})
module.exports =mongoose.model('Story',StorySchema) //  export as a mongoos  model 
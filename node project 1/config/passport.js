const GoogleStrategy= require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User=require('../models/User')

module .exports= function (passport) {
passport.use(
new GoogleStrategy (
    {
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/auth/google/callback'
},
async (accessToken, refreshToken,profile,done) =>
 {
    const newUser= { // this is the user whose details were gotten from the gmail authentication service
        googleId:profile.id,
        displayName:profile.displayName,
        firstName:profile.name.givenName,
        lastName:profile.name.familyName,
        image:profile.photos[0].value
    }
// validting if user is in my database 
try{
    let user=await User.findOne({googleId:profile.id}) // checking to  see if the user is in db
if (user){
    done(null,user) // if user exists return user
} else {
    user=await User.create(newUser)  //create new user
    done(null,user) // retunr user

}}

catch(err){
    console.error(err);
}



}))
passport.serializeUser ((user,done)=> {
    done(null,user.id);
})
passport.deserializeUser(
    (id,done)=> 
    {User.findById(id, (err,user)=>
        {done(err,user);
        })
})}
 
const express=require('express');
const passport = require('passport');

const router= express.Router();


//  @route GET /auth/google  Login
// router for the authentication with google 

router.get(
    '/google',
    passport.authenticate('google', //iusing google roues
    {scope: ['profile']}))// the data we requirew is scope data 


// router using Google auth callback for the   login attempt 
// if succesful login leads  to dashboard page at /dashboard 

router.get(
    '/google/callback'
    ,passport.authenticate('google',{failureRedirect: '/'}), //if login fails leads to login page  
 (req,res) =>{ // if succesful login leads  to dashboard page at /dashboard 
    res.redirect('/dashboard');
}

)

// logout 
//after successful login, ther is a logout method that is returned
// description logout user
//route /auth/logout  

router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/')
})


module.exports =router

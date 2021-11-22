                const express=require('express');
const   Story= require('../models/Story')
const router= express.Router();

const { ensureAuth,ensureGuest}=require('../middleware/auth') // ensureauth protects our dashboard from unlogged in users
// ensureGuest prevents loggedin users from accessing the login page without first logging out 
// router for the login/landing page at /
router.get('/', ensureGuest,(req, res) => {
res.render("login",{
    layout: 'login'
});

});


// router for the dashboard page at /dashboard
router.get('/dashboard',ensureAuth, async (req, res) => {
try {
    const stories=await Story.find({user: req.user.id}).lean() //lean returns ajs json file 
    res.render("dashboard",{
name:req.user.firstName,stories

    } )
} catch (error) {
    console.error(error);
    res.render('error/500');
}
});
module.exports =router

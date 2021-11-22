const express= require('express');
const passport= require('passport')

const router= express.Router()
// @route GET /auth/google Login
// router for the authentication with google 

router.get(
    '/google',
passport.authenticate('google', {
    scope:['profile']
})
    
    )

router.get('/google/callback',
passport.authenticate('google',{failureRedirect:'/'}),
(req, res) => {
    res.redirect('/dashboard');
}
)


module.exports =router;
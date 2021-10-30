const express=require('express');

const router= express.Router();


// router for the login/landing page at /
router.get('/',(req, res) => {
res.render("login1")

})


// router for the dashboard page at /dashboard
router.get('/dashboard',(req, res) => {
res.render("dashboard")

})

module.exports =router

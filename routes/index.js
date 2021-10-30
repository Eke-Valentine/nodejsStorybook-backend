const express=require('express');

const router= express.Router();


// router for the login/landing page at /
router.get('/',(req, res) => {
res.send("Login")

})


// router for the dashboard page at /dashboard
router.get('/dsshboard',(req, res) => {
res.send("dahsboard")

})

module.exports =router

const express = require('express')

const router=express.Router()


router.get('/home',(req, res, next)=>{
    res.send("Home")
});

router.get('/account',(req, res)=>{
    res.send("Account")
})

module.exports =router;
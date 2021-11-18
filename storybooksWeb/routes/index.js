const express= require('express')

const router= express.Router()

router.get('/', (req, res)=>{
res.render("logins",{
    layout:'logins'
})
//console. log(`req ${req} `)
//console. log(`res ${res} `)
})


module.exports =router;
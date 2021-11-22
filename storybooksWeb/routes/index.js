const express= require('express')
  
const router= express.Router()

router.get('/', (req, res)=>{
res.render("logins",{
    layout:'logins'
})
//console. log(`req ${req} `)
//console. log(`res ${res} `)
})

router.get('/dashboard', async (req,res)=>{
    console.log (`req ${req}`)
    console.log (`res ${res}`)

try{
    const stories=await Story.find({user:req.user.id}).lean()
    res.render("dashboard",{
        name:req.user.firstName,stories
    })
}catch(error){
    console.error(error);
    res.render('error/500')
}
    
});

module.exports =router; 
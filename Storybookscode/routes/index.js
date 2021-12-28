const express= require ('express')
const Story= require('../models/Story')

const router=express.Router();
const {ensureAuth,ensureGuest} =require('../middleware/auth' ) 

router.get('/',ensureGuest ,(req, res)=> {
res.render("login", {layout: 'login'});

})

router.get('/dashboard',ensureAuth ,async (req, res)=>{
    try {
        //console.log(req)
const stories= await Story.find({user:req.user._id }).lean()
    res.render("dashboard",{name:req.user.firstName,stories })    
    } catch (error) {
      console.error(error)
        
    }
})


module.exports =router;
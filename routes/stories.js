const express=require('express');
const   Story= require('../models/Story')
const router= express.Router();
//
const { ensureAuth,ensureGuest}=require('../middleware/auth') // ensureauth protects our dashboard from unlogged in users
// ensureGuest prevents loggedin users from accessing the login page without first logging out 
// router for the login/landing page at /

// router for the dashboard page at /dashboard
router.get('/add',ensureAuth, async (req, res) => {
    res.render("stories/add")
    

})


router.post('/',ensureAuth, async (req, res) => {
    try {
        req.body.user=req.user.id // tomuse request.body you need to ADD a bodyparser midleware in app.js
        await Story.create(req.body)// creatses the story from the form data
        res.redirect('/dashboard')

        
    } catch (error) {
        console.error(error);
        res.render('error/500')
    }

})


// router for the stories page at /stories/add
router.get('/',ensureAuth, async (req, res) => {

try {
    const stories= await Story.find({status:'public'}) //find all the public storiees
    .populate('user')// populate the user field from the User model
    .sort({createdAt:'desc'})//sort in descending order of time created
    .lean() // allows json
    
    res.render('stories/index',{stories});
    
} catch (error) {
    console.error(error);
    res.render('error/500')    
}
})

router.get('/:id',ensureAuth, async (req, res) => {
    
    try {
        let story= await Story.findById(req.params.id)
        .populate('user')
        .lean()
        if(!story){
            return res.render('error/400')
        }
        console.log(story)
        res.render('stories/show',{story})

    } catch (error) {
        console.error(error);
        res.render('error/404')
        
    }
    

})

router.get('/user/:userId',ensureAuth, async (req, res)=>{
try {
    const stories= await Story.find({
        user:req.params.userId,
        status:'public'
    })
    .populate('user')
    .lean()
    

    res.render('stories/index',{
        stories,
    })
}
 catch (error) {
 console.error(error);
 res.render('error/500')   
}
    
})


// edit page for logged in user //
// route is GET
router.get('/edit/:id',ensureAuth, async (req, res) => {
   const story= await Story.findOne({_id: req.params.id}).lean()
   if(!story){
       return res.render('error/404')
   }
    if(story.user != req.user.id){
        res.redirect('/stories')
    }else{
        res.render('stories/edit',
        {story,
        })
    }

})

// update story with
// PUT /stories/:id
router.put('/:id',ensureAuth, async (req, res) => {
    let story=await Story.findById(req.params.id).lean()
    if(!story){
        return res.render('error/404')
    }
    if(story.user != req.user.id){
        res.redirect('/stories')
    }else{
        story=await Story.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,
            runValidators:true,
            returnNewDocument:true,
    })
    console.log(req.body)
res.redirect('/dashboard')

    }

});
// deletion  router for the dashboard page at DELETE /stories/:id
router.delete('/:id',ensureAuth, async (req, res) => {
   try {
       await Story.remove({_id: req.params.id})
       res.redirect('/dashboard')
   } catch (error) {
       console.error(error);
       return res.render('error/500')
       
   }
})

module.exports =router

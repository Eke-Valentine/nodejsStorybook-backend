const express= require('express');
const Story= require('../models/Story')
const {ensureAuth,ensureGuest}=require('../middleware/auth')
const router= express.Router()

// display the page to add storiees

router.get('/add',ensureAuth, function(req, res){
res.render('stories/add')
})
// post the data recoredered on the form page to servers

router.post('/', ensureAuth, async (req, res)=> {
    try {
        req.body.user=req.user.id //this assigns the current logged in user to the updater of the storry    //ADD a middle ware in app.jss
        await Story.create(req.body) //creates the story using all the entered details
        res.redirect('/dashboard')



    } catch (error) {
      console.error(error)
      res.render('error/500')
        
    }

})

router.get('/',ensureAuth, async (req, res)=> {
try {
    const stories= await Story.find({status:'public'})
    .populate('user') // populate the user field from the User model
    .sort({createdAt:'desc'}).lean()


} catch (error) {
    
}



})



router.get('/edit/:id',ensureAuth, async(req, res)=>{
const story = await Story.findOne({id: req.params.id}).lean()
if(!story){
    console.log('error')
    return res.render('error/404')
}
if(story.user != req.user.id){
res.redirect('/stories')

}
else{
    res.render('stories/edit',{story,})
}

})




module.exports= router
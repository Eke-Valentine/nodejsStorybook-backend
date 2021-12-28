// ensures i cannot access the app if not login to the app  
module.exports={

    ensureAuth: (req,res, next)=>{
        if (req.isAuthenticated() ){
            return next();
        
        }
        else{
            res.redirect('/')
        }
    },
ensureGuest:(req,res,next)=>{
if(req.isAuthenticated() ){
    res.redirect('/dashboard')
}
else{
    return next()
}

}

}
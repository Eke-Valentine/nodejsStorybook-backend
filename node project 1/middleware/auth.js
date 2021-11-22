module.exports ={
    ensureAuth:function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/')
        }



    },
    ensureGuest: (req, res, next)=>{
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
            //{name:req.user.lastName})
        }
        else{
            return next();
        }
    }
}
const validateUserAuth=(req,res,next)=>{
    if(!req.body.Email || !req.body.password || !req.body.userName)
    {
        return res.status(400).json({
            success:false,
            data:{},
            message:"Something Went Wrong",
            err:"Email or Password or userName Missing in the request"
        })

    }
    next();
}

module.exports={
    validateUserAuth
}


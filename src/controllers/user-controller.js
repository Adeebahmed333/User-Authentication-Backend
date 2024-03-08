const UserService=require('../services/user-service');

const userService=new UserService();

const create =async (req,res)=>
{
    try {
        const response= await userService.create({
            Email:req.body.Email,
            password:req.body.password,
            userName:req.body.userName
        });
        return res.status(201).json({
            success:true,
            message:"Successfully Created a new User",
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something Went Wrong In Contoller Layer",
            data:{},
            success:false,
            err:error
        });
    }
}

const signIn =async(req,res)=>{
    try {
        const response=await userService.signIn(req.body.userName,req.body.password);
        return res.status(200).json({
            message:"Successfully Signed In",
            data:response,
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Something Went Wrong in Controller",
            data:{},
            success:false,
            err:error
        });
    }
}
const isAuthenticated=async(req,res)=>{
    try {
        const token=req.headers['x-access-token'];
         const response=await  userService.isAuthenticated(token);
         return res.status(200).json({
            message:"User is authenticated and token is valid",
            data:response,
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something Went Wrong In Controller Layer",
            data:{},
            success:false,
            err:error
        });
        
    }
}

module.exports={
    create,
    signIn,
    isAuthenticated,
}
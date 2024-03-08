const UserService=require('../services/user-service');
const crypto=require('crypto');
const {createTransport}=require('nodemailer');
const{User}=require('../models/index');
const{EMAIL_PASS,EMAIL_ID}=require('../config/serverConfig');
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
const forgotpassword =async(req, res)=> {
    const  email  = req.body.Email;
    
    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resettoken = resetToken;
    await user.save();
    
    const resetUrl = `https://myapp/forgotPassword?token=${resetToken}`;
    var transporter = createTransport({
        service: 'gmail',

        auth: {
            user: EMAIL_ID,
            pass: EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'adeebahmed3337@gmail.com',
        to: email,
        subject: "Reset Password",
        html:`<h1>Reset Password</h1><h2>Click on the link to reset your password</h2><h3>${resetUrl}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
    res.status(200).json({ message: 'A link to reset your password have been sent to your email.' });
  };
module.exports={
    create,
    signIn,
    isAuthenticated,
    forgotpassword
}
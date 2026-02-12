import exp from "express";
import {authenticate} from "../services/authServices.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../middleware/verifyToken.js";
import { UserTypeModel } from "../Models/UserModel.js";

export const commonRouter=exp.Router();


//login
commonRouter.post("/authenticate",async(req,res,next)=>{
        try{
        // get user credentials obj
        let userCred = req.body;
        // call authenticate service
        let { token, user } = await authenticate(userCred);
        // save token as httpOnly
        res.cookie("token", token, {httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        // send res
        res.status(200).json({ message: "login success" })
        }
        catch(err){
            next(err);
        }
    })

//logout for user author and  admin
commonRouter.post('/logout',(req,res)=>{
  //clear all cookie named token
  res.clearCookie('token',{
    httpOnly:true,//must match original setting 
    secure:false,//must match original setting
    sameSite:'lax'//must match original setting
  });
  res.status(200).json({message:"loggoing out successfully"});
});

commonRouter.put('/change-password',verifyToken,async(req,res)=>{
    try{
        // get current password and new password
        const { currentPassword, newPassword } = req.body;

        // get logged-in user
        const user = await UserTypeModel.findById(req.user.userId);

        // check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Current password is incorrect" });
        }
        // hash new password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

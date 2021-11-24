const express = require("express");
const mongoose = require('mongoose');
const User = require("../db_connection/userTable")
const otp = require("../db_connection/otptable")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const saltRounds = 10;
const app = express();
app.use(cookie())
app.use(express.json());



exports.signUp = async (req,res)=>{

    var haspassword = await bcrypt.hash(req.body.user_password, saltRounds);  
    // console.log(req.body.user_password);
    // console.log(haspassword)

    var user_details = {
        user_name:req.body.user_name,
        user_email:req.body.user_email,
        user_gender:req.body.user_gender,
        user_profilePic:req.file.filename,
        user_location:req.body.user_location,
        user_password:haspassword
    };

    let userModel = new User(user_details);
    await userModel.save();
    res.json(userModel);
};


exports.login = async(req,res)=>{
    const user_email = req.body.user_email; 
    var userDetails = User.findOne({user_email:user_email}).
    then((result)=>{
        var password = result["user_password"];
        
        if(bcrypt.compare(req.body.user_password,password)){

            if(result.length!=0){

                var Email = result["user_email"]; 

                var token = jwt.sign({Email},"loginToken",{ 

                    expiresIn: '365d'
                });
                res.cookie("token",token).json({

                    message:"user Founded",
                    user:token
                })
            }else{
                res.send("data is not there ");
            };
            
        }
        else{
            res.send("password is invalid"); 
        };
    }).
    catch((err)=>{
        res.send(err)
    });
};

exports.otpOnEmail = async(req,res)=>{
    const user_email = req.body.user_email;
    var userDetails = User.findOne({user_email:user_email});  
    if(userDetails){
        let otpcode = Math.floor((Math.random()*100000)+1);
        let otpData = new otp({
            user_email:user_email,
            code:otpcode,
            expireIn: new Date().getTime()+300*1000
        }); 
        let response = await otpData.save();
        res.send({
            status:'Success',
            message:'otp has been send on you mail please check it'
        });
    }else{
        res.send({
            status:'error',
            message:'Email is not Exits'
        });
    };
};

exports.forgetPassword = async(req,res)=>{

    const userData =  await otp.find({user_email:req.body.user_email});
    // console.log(userData);
    if(userData){
        let currentTime = new Date().getTime();
        let timeLimit = currentTime - userData.expireIn;
        if(timeLimit<0){
            res.send({
                status:"error",
                message:"otp is expired"
            }); 
        }
        else{  
            let user = await User.findOne({user_email:req.body.user_email});
            user.user_password = req.body.user_password;
            user.save();
            res.send({
                message:"Your password has been changed successfully", 
                status:"success"
            }); 
            
        };
    }
    else{
        res.send({
            status:"error",
            message:"otp is invalid"
        });
    };
};


// exports.try = (req,res)=>{
//     res.send("ok")
// }
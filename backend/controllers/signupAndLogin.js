const express = require("express");
const User = require("../model/userTable");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const saltRounds = 10;
const app = express();

app.use(cookie())
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("Added CORS header");
    next();
});


// This Api we will use for Signup

exports.signUp = (req, res) => {

    try {
        // console.log(req.body)
        // console.log(req.body.testimage)
        // console.log(req.file.path)
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.user_email)) {
            User.findOne({ user_email: req.body.user_email }).exec(async (err, user) => {
                if (user) {
                    return res.status(403).send({ status:"error" ,  message: "User is already exits with this email address" ,error:err})
                };

                if (req.body.user_password === req.body.confirm_password) {
                    var gender = req.body.user_gender.toLowerCase();
                    if (req.body.user_password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))) {
                        if(gender=="female" || gender=="male" || gender=="other"){
                            var Payload = {
                                user_name: req.body.user_name,
                                user_email: req.body.user_email,  
                                user_gender: gender, 
                                user_profilePic: req.file.filename,
                                user_location: req.body.user_location,
                                user_password: await bcrypt.hash(req.body.user_password, saltRounds)
                            };
                            let userModel = new User(Payload);
                            // await adduser(Payload)
                            await userModel.save()
    
                            return res.status(201).send({
                                message: "Your account has created.....",
                                //mail: "Verification mail has sent on your mail"
                            });
                        }else{
                            return res.status(401).send({
                                message:"input is not valid"
                            })
                        }
                        

                    } else {
                        return res.status(203).send({
                            message: "password should have([@,#,$,&],[0-9],[A-z].....)"
                        })
                    };

                } else {
                    return res.status(203).send({
                        message: "confirm password is not same....."
                    });
                };
            });
        }
        else {
            return res.status(203).send({
                message: "this email address is not valid...."
            });
        };
    }
    catch (err) {
        return res.status(500).send({message:err.message})
    }
};

//This is for user Login

exports.login = async (req, res) => {
    try {
        var userDetails = await User.findOne({ user_email: req.body.user_email })
        // console.log(userDetails)

        if (userDetails) {
            bcrypt.compare(req.body.user_password, userDetails["user_password"], (err, data) => {
                if (err) throw err

                if (data) {

                    if (userDetails) {

                        var token = jwt.sign({ Email: userDetails["user_email"],ID:userDetails["_id"]}, "loginToken", {

                            expiresIn: '365d'
                        }); 
                        return res.cookie("token", token).json({
                            message: "you login successfully....",
                            cookie: token
                        });
                    } else {
                        return  res.status(204).json({
                            message: "Data is not exits...."
                        });
                    };
                } else {
                    return res.status(401).json({ msg: "Invalid credencial...." });
                };

            });
        } else {
            return  res.status(401).json({
                message: "user not Authorization...",
            });
        };
    }
    catch (error) {
        return res.status(401).json({
            message: "something went wrong...."
        });
    };
};




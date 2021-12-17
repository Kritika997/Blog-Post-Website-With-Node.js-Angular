const express = require("express");
const User = require("../db_connection/userTable");
const nodemailer = require("nodemailer");
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
                    res.json({ error: "User is already exits with this email address" })
                };

                // var transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     auth: {
                //         user: 'kritika19@navgurukul.org',
                //         pass: 'lovekrishna'
                //     }
                // });

                // transporter.sendMail({
                //     to: req.body.user_email,
                //     from: 'kritika19@navgurukul.org',
                //     subject: 'This mail is only for verification is mail right or not?'
                // });

                if (req.body.user_password === req.body.confirm_password) {
                    if (req.body.user_password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))) {
                        var Payload = {
                            user_name: req.body.user_name,
                            user_email: req.body.user_email,  
                            user_gender: req.body.user_gender, 
                            user_profilePic: req.file.filename,
                            user_location: req.body.user_location,
                            user_password: await bcrypt.hash(req.body.user_password, saltRounds)
                        };
                        let userModel = new User(Payload);
                        await userModel.save()

                        res.status(201).json({
                            message: "Your account has created.....",
                            //mail: "Verification mail has sent on your mail"
                        });

                    } else {
                        res.status(203).json({
                            message: "password should have([@,#,$,&],[0-9],[A-z].....)"
                        })
                    };

                } else {
                    res.status(203).json({
                        message: "confirm password is not same....."
                    });
                };
            });
        }
        else {
            res.status(203).json({
                message: "this email address is not valid...."
            });
        };
    }
    catch (err) {
        res.json('err')
    }
};

//This is for user Login

exports.login = async (req, res) => {
    try {
        var userDetails = await User.findOne({ user_email: req.body.user_email })

        if (userDetails) {
            bcrypt.compare(req.body.user_password, userDetails["user_password"], (err, data) => {
                if (err) throw err

                if (data) {

                    if (userDetails) {

                        var token = jwt.sign({ Email: userDetails["user_email"] }, "loginToken", {

                            expiresIn: '365d'
                        }); 
                        res.cookie("token", token).json({
                            message: "you login successfully....",
                            cookie: token
                        });
                    } else {
                        res.status(204).json({
                            message: "Data is not exits...."
                        });
                    };
                } else {
                    res.status(401).json({ msg: "Invalid credencial...." });
                };

            });
        } else {
            res.status(401).json({
                message: "user not Authorization...",
            });
        };
    }
    catch (error) {
        res.status(401).json({
            message: "something went wrong...."
        });
    };
};




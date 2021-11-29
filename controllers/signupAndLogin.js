const express = require("express");
const mongoose = require('mongoose');
const User = require("../db_connection/userTable");
const nodemailer = require("nodemailer");
const crypto = require("crypto")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const saltRounds = 10;
const app = express();
app.use(cookie())
app.use(express.json());




exports.signUp = (req, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kritika19@navgurukul.org',
                pass: 'lovekrishna'
            }
        });

        var mailOptions = {
            from: 'kritika19@navgurukul.org',
            to: req.body.user_email,
            subject: 'verification of email',
            text: 'check email is valid or not'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("verification has been sent on your registered emailId")
                var Email = req.body.user_email;
                User.findOne({ user_email: Email }).exec((err, user) => {
                    if (user) {
                        res.send({ error: "User with this email already exits" })
                    }
                    var user_password = req.body.user_password
                    var confirm_password = req.body.confirm_password
                    if (user_password === confirm_password) {
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {

                            var Useremail = Email;
                            function isUpper(str) {
                                return /[A-Z]/.test(str);
                            };
                            function hasLowerCase(str) {
                                return (/[a-z]/.test(str));
                            };
                            function hasSpecialcorrector(myString) {
                                return (/[@,#,$,&]/.test(myString));
                            };
                            function hasNumber(myString) {
                                return (/[0-9]/.test(myString));
                            };
                            async function checkYourPassword(user_password) {
                                if (user_password.length >= 8 && user_password.length <= 12) {

                                    if (hasLowerCase(user_password)) {

                                        if (isUpper(user_password)) {

                                            if (hasSpecialcorrector(user_password)) {

                                                if (hasNumber(user_password)) {
                                                    let password = user_password
                                                    console.log("wow finally you created a strong and secure password for your account: ")
                                                    var haspassword = await bcrypt.hash(password, saltRounds);
                                                    var user_details = {
                                                        user_name: req.body.user_name,
                                                        user_email: Useremail,
                                                        user_gender: req.body.user_gender,
                                                        user_profilePic: req.file.filename,
                                                        user_location: req.body.user_location,
                                                        user_password: haspassword
                                                    };

                                                    let userModel = new User(user_details);
                                                    await userModel.save();
                                                    res.json(userModel);
                                                    console.log("Email is valid")
                                                } else {
                                                    console.log("in it one numeric also should be there: ")
                                                };
                                            } else {
                                                console.log("There should be one special corrector for making your password more secure: ")
                                            };
                                        } else {
                                            console.log("your password should be have one capital letter: ")
                                        };
                                    } else {
                                        console.log("it should be have small corrector: ");
                                    };
                                } else {
                                    console.log("Password Length should be maximum 8 and lessthan 12: ");
                                };
                            };
                            checkYourPassword(user_password);
                        }
                        else {
                            console.log("your email is not valid")
                        };
                    } else {
                        console.log("Both password are not same please enter same passowrd")
                    };

                });
            };
        });

    }
    catch {
        res.send({ status: "error" })
    }
};


exports.login = async (req, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kritika19@navgurukul.org',
                pass: 'lovekrishna'
            }
        });

        var mailOptions = {
            from: 'kritika19@navgurukul.org',
            to: req.body.user_email,
            subject: 'verification of email',
            text: 'check email is valid or not'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("verification has been sent on your registered emailId")
                const user_email = req.body.user_email;
                var userDetails = User.findOne({ user_email: user_email }).

                    then((result) => {

                        var password = result["user_password"];

                        // console.log(password)

                        bcrypt.compare(req.body.user_password, password, (err, data) => {
                            //if error than throw error
                            if (err) throw err

                            //if both match than you can do anything
                            // console.log(data)
                            if (data) {
                                if (result.length != 0) {

                                    var Email = result["user_email"];

                                    var token = jwt.sign({ Email }, "loginToken", {

                                        expiresIn: '365d'
                                    });
                                    res.cookie("token", token).json({

                                        message: "user Founded",
                                        user: token
                                    })
                                } else {
                                    res.send("data is not there ");
                                };
                            } else {
                                res.status(401).send({ msg: "Invalid credencial" })
                            };

                        });
                    }).
                    catch((err) => {
                        res.send(err)
                    });
            }
        });

    }
    catch (error) {
        res.send({
            status: "error",
            message: error
        });
    };
};

exports.sendMail = (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }
        else {
            const token = buffer.toString("hex");
            // console.log(token)
            User.findOne({ user_email: req.body.user_email })
                .then((user) => {
                    // console.log(user)
                    if (!user) {
                        return res.status(404).json({ error: "user doesn't exits with this email address" })
                    };
                    user.resetToken = token
                    user.expireToken = Date.now() + 3600000
                    user.save().then((result) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'kritika19@navgurukul.org',
                                pass: 'lovekrishna'
                            }
                        });
                        transporter.sendMail({
                            to: user.user_email,
                            from: 'kritika19@navgurukul.org',
                            subject: 'Reset Password Email',
                            text: token
                        })
                        res.send({ message: "check your mail" });
                    })
                })
                .catch((err) => {
                    res.send(err)
                });
        };
    });
};

exports.forgetPassword = async (req, res) => {

    const userData = await User.findOne({ user_email: req.body.user_email });
    // console.log(userData);
    if (userData) {
        // console.log(userData)
        let currentTime = new Date().getTime();
        let timeLimit = userData.expireToken - currentTime;
        // console.log(userData.expireToken)
        // console.log(timeLimit)
        if (timeLimit < 0) {
            res.send({
                status: "error",
                message: "Email is expired"
            });
        }
        else {
            let user = await User.findOne({ user_email: req.body.user_email });
            let password = req.body.user_password;
            var haspassword = await bcrypt.hash(password, saltRounds);
            user.user_password = haspassword
            user.save();
            res.send({
                message: "Your password has been changed successfully",
                status: "success"
            });

        };
    }
    else {
        res.send({
            status: "error",
            message: "otp is invalid"
        });
    };
};


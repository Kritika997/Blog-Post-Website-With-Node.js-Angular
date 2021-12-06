const express = require("express");
const User = require("../db_connection/userTable");
const otp = require("../db_connection/otpTable");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
app.use(cookie());
app.use(express.json());


exports.sendOTPbyEmail = async (req, res) => {

    var userDetails = await User.findOne({ user_email: req.body.email });
    if (userDetails) {
        // console.log(userDetails)
        var otpCode = Math.floor(1000 + Math.random() * 9000);
        const otpData = new otp({
            email: req.body.email,
            code: otpCode,
            //expireIn: new Date().getTime() + 300 * 1000
        });


        // var data = new otp(otpData)
        await otpData.save()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kritika19@navgurukul.org',
                pass: 'lovekrishna'
            }
        });

        transporter.sendMail({
            to: req.body.email,
            from: 'kritika19@navgurukul.org',
            subject: 'your one password',
            text: `${otpCode}`
        });
        var token = jwt.sign({ Email: userDetails["user_email"] }, "userVerify", {

            expiresIn: '2m'
        });
        res.cookie("validation", token).json({
            status: "token created",
            message: "OTP created successfully",
            cookie: token
        });


    } else {
        res.status(401).json({
            message:"user not Authorization"
        });
    };
};

exports.forgetPassword = async (req, res) => {
    
    const userData = await otp.find({ email: req.user.Email, code: req.body.otp });

    if (userData) { 

        let currentTime = new Date().getTime();
        let timeLimit = userData[0]["expireIn"] - currentTime;

        if (timeLimit < 0) {
            res.status(410).json({
                message: "OTP is expired"
            });
        }
        else {
            let user = await User.findOne({ user_email: req.user.Email });
            let password = req.body.password;
            let reConfirm = req.body.reConfirm
            if (password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))) {
                if (password === reConfirm) {

                    var haspassword = await bcrypt.hash(password, saltRounds);
                    // console.log(haspassword)
                    user.user_password = haspassword
                    user.save();
                    res.status(200).json({
                        message: "Your password has been changed successfully"
                    });
                }
                else {
                    res.json({
                        message:"both password are not same"
                    })
                };

            }
            else {
                res.json({
                    message:"password shoul have [0-9],[@,$,#],[A-z]"
                });
            };

        };
    }
    else {
        res.status(401).json({
            message: "otp is invalid"
        });
    };

};

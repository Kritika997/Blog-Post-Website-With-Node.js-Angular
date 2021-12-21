const express = require("express");
const User = require("../model/userTable");
const otp = require("../model/otpTable");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
app.use(cookie());
app.use(express.json());


exports.forgetpassword = async (req, res) => {
       
    var userDetails = await User.findOne({ user_email: req.body.user_email });
    if (userDetails) {
        // console.log(userDetails)
        var otpCode = Math.floor(1000 + Math.random() * 9000);
        const otpData = new otp({
            email: req.body.user_email,
            code: otpCode,
            expireIn: new Date().getTime() + 300 * 1000
        });
        // console.log(otpData)


        var data = new otp(otpData)
        await otpData.save()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kritika19@navgurukul.org',
                pass: 'lovekrishna'
            }
        });

        transporter.sendMail({
            to: req.body.user_email,
            from: 'kritika19@navgurukul.org',
            subject: 'your one Time password',
            text: `${otpCode}`
        });
        var token = jwt.sign({ Email: userDetails["user_email"], Id:userDetails["_id"] }, "userVerify", {

            expiresIn: '1h'
        });
        return res.cookie("validation", token).json({
            status: "token created",
            message: "OTP created successfully",
            cookie: token
        });


    } else {
        return res.status(401).json({
            message:"user not Authorization"
        });
    };
};

exports.otpverification = async (req, res) => {
    // console.log("wertyuio")
    const userData = await otp.find({ email: req.userVerify.Email, code:req.body.otp}); 
    // console.log(userData)
    // console.log(req.body)
    if (userData) { 

        let currentTime = new Date().getTime();  
        let timeLimit = userData[0]["expireIn"]-currentTime;  
        // console.log(timeLimit)

        if (timeLimit < 0) {
            return res.status(410).json({
                message: "OTP is expired"
            });
        }
        else {
            let user = await User.findOne({ user_email: req.userVerify.Email });
            let password = req.body.password;
            let reConfirm = req.body.reConfirm;
            // console.log(password, reConfirm)
            if (password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))) {
                if (password === reConfirm) {

                    var haspassword = await bcrypt.hash(password, saltRounds);
                    // console.log(haspassword)
                    user.user_password = haspassword
                    user.save();
                    return res.status(200).json({
                        message: "Your password has been changed successfully"
                    });
                }
                else {
                    return res.json({
                        message:"both password are not same"
                    })
                };

            }
            else {
                return res.json({
                    message:"password shoul have [0-9],[@,$,#],[A-z]"
                });
            };

        };
    }
    else {
        return res.status(401).json({
            message: "otp is invalid"
        });
    };

};

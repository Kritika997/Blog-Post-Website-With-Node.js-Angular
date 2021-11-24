const express = require("express");
const control = require("../controllers/signup");
const contPost = require("../controllers/posts");
var route = express.Router();
const multer = require("multer");
const authrization = require("../authorization/auth")


const Storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({
    storage: Storage
})

route.post("/signup",upload.single('testimage') ,control.signUp); 

route.get("/login",control.login);
route.post("/otpOnEmail",control.otpOnEmail);
route.post("/forgetPassword",control.forgetPassword);
route.post("/createPost",upload.single('testimage'),authrization,contPost.createPost);
route.get("/seeAllPost",contPost.seeAllPost);
// route.get("/try",authrization,control.try);

module.exports = route;
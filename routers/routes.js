const express = require("express");
const control = require("../controllers/signupAndLogin");
const contPost = require("../controllers/posts");
const likeOrDislike = require("../controllers/LikeAndComment");
const changePassword = require("../controllers/forgetpassword");
const route = express.Router();
const multerFile = require("../controllers/multerFile");
const Middleware = require("../Middleware/Auth");
const postAllDetails = require("../controllers/getAllPostDetails")
const otpToken = require("../Middleware/otptokenvalid")
// These are ours route which will help us to send our resquest to server

route.post("/signup", multerFile.single('testimage'), control.signUp);

route.post("/login", control.login);

route.post("/sendOTPbyEmail",Middleware,changePassword.sendOTPbyEmail);

route.post("/forgetPassword",otpToken,changePassword.forgetPassword);

route.post("/createPost", multerFile.single('testimage'), Middleware, contPost.createPost);

route.get("/seeAllPost", contPost.seeAllPost);

route.post("/LikePost/:id", Middleware, likeOrDislike.LikePost);

route.post("/Comment/:id",Middleware,likeOrDislike.Comment);

route.delete("/deleteComment/:id",Middleware,likeOrDislike.deleteComment);

route.put("/EditPost/:id",multerFile.single('testimage'),Middleware,contPost.EditPost);

route.delete("/deletePost/:id",Middleware,contPost.deletePost);

route.get("/userPostAllDetails",postAllDetails.userPostAllDetails);

module.exports = route;
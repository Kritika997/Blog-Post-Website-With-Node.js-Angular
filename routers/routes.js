const express = require("express");
const control = require("../controllers/signupAndLogin");
const contPost = require("../controllers/posts");
const route = express.Router();
const multerFile = require("../controllers/multerFile");
const Middleware = require("../Middleware/Auth")

route.post("/signup", multerFile.single('testimage'), control.signUp);
route.get("/login", control.login);
route.post("/sendMail", control.sendMail);
route.post("/forgetPassword", control.forgetPassword);
route.post("/createPost", multerFile.single('testimage'), Middleware, contPost.createPost);
route.get("/seeAllPost", contPost.seeAllPost);
route.post("/LikePost", Middleware, contPost.LikePost);
route.post("/Comment",Middleware,contPost.Comment);
route.put("/EditPost",multerFile.single('testimage'),contPost.EditPost);
route.delete("/deletePost",contPost.deletePost);
route.get("/UserProfileAndPost",Middleware,contPost.UserProfileAndPost)
module.exports = route;
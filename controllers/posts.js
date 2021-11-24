const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
const User = require("../db_connection/userTable")
const usersPost = require("../db_connection/postTable");
const app = express();
app.use(express.json());

const Storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({
    storage: Storage,
    fileFilter: function(req,file,cb){
        if(
            file.mimetype =="image/png" ||
            file.mimetype =="image/jpg"
        ){
            cb(null, true);
        }else{
            console.log("only png and jpg file");
            cb(null, false);
        };
    },
    limits:{
        fileSize:1024*1024*5
    }
});

exports.createPost = async(req,res)=>{
    user_email = req.user.Email;
    // console.log(user_email);
    var userDetails = await  User.findOne({user_email:user_email})
        // console.log(userDetails);
    if(userDetails){
        const postData = {
            Blog:req.body.Blog,
            Picture:req.file.filename,
            Comment:req.body.Comment,
            Like:req.body.Like,
            userDislike_dislike:req.body.Dislike
        };
        let data = new usersPost(postData);
        await data.save();
        
        res.send({
            status:"success",
            data:data
        });
    }else{
        res.send({
            status:"error",
            message:"you need to login first" 
        });
    };
    
};

exports.seeAllPost = async(req,res)=>{
    try{
        const posts = await usersPost.find()
        res.json(posts)
    }
    catch(error){
        res.status(500).send(error);
    };
}





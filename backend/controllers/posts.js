const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
const User = require("../model/userTable")
const usersPost = require("../model/postTable");
// const { log } = require("console");
const app = express();
app.use(express.json());
// const post = require('../service/postService')




// In this API we are creating our post which user want to create after login only user can create it.

exports.createPost = async (req, res) => {
    try {
        // console.log("ertyuio")
        var userDetails = await User.findOne({ user_email: req.user.Email });
        // console.log(userDetails)
        if (userDetails) {
            
            var wordCount = req.body.Blog.match(/(\w+)/g).length;

            // console.log(req.file);
            if (wordCount <= 200) {
                const postData = {
                    UserId: userDetails["_id"],
                    Blog: req.body.Blog,
                    Picture: req.file.path,
                    Like: 0
                };

                let data = new usersPost(postData);
                await data.save();

                return res.status(201).json({
                    message: "Post created successfully...."
                });
            }
            else {

                // console.log("Blog size should be equal and less than 200....")
                return res.status(401).json({
                    message: "Blog size should be equal and less than 200...."
                });
            };

        } else {
            return res.status(401).json({
                message: "user not Authorization"
            });

        };
    }
    catch (err) {
        return res.status(400).json({
            message: "error"
        });
    };

};

// With this API user can see all post without login or signup

// exports.seeAllPost = async (req, res) => {
//     try {
//         const posts = await usersPost.find()
//         res.status(200).json({
//             data: posts
//         });
//     }
//     catch (error) {
//         res.status(400).json({
//             message: error
//         });
//     };
// }


// Only Admin can update the post which he created

exports.editPost = async (req, res) => {
    // console.log(req)
    userData = await usersPost.find({ UserId: req.user.ID })

    if (userData) { 
        var UserId = await usersPost.findOne({ _id: req.params.id });
        // console.log(UserId)  
        if (UserId) {

            var Blog = req.body.Blog;
            var Picture = req.file.path;
            UserId.Blog = Blog
            UserId.Picture = Picture

            await UserId.save()
            return res.status(200).json({
                message: "success",
                data: UserId
            });
        }
        else {
            return res.status(400).json("id is not valid");
        };
    }
    else {
        return res.status(401).json({
            message: "user not Authorization"
        });
    };
};
   
//In this post's admin only can delete the post

exports.deletePost = async (req, res) => {

    var userDetails = await usersPost.find({ UserId: req.user.ID });
    if (userDetails) {
        var UserId = await usersPost.findOne({ _id: req.params.id });
        // console.log(UserId)
        if (UserId) {
            // console.log(UserId)
            usersPost.deleteOne(UserId, function (err, result) {
                if (err) throw err;
                if (result != 0) {
                    
                    return res.status(200).json({
                        message: "1 document deleted"
                    });
                }
                else {
                    return res.json("document has not deleted");
                };
            });
        }
        else {
            return res.json("id is not valid");
        };
    }
    else {
        return res.status(401).json({
            message: "user not Authorization"
        });
    };
};

//User can see specific post which he want after login




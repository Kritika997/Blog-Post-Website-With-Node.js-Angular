const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
const User = require("../db_connection/userTable")
const usersPost = require("../db_connection/postTable");
const app = express();
app.use(express.json());


// In this API we are creating our post which user want to create after login only user can create it.

exports.createPost = async (req, res) => {
    try {

        var userDetails = await User.findOne({ user_email: req.user.Email });

        if (userDetails) {
            // console.log(userDetails)

            var wordCount = req.body.Blog.match(/(\w+)/g).length;
            // console.log(wordCount)

            if (wordCount <= 200) {
                const pic = req.file.filename
                const blog = req.body.Blog
                const postData = {
                    UserId: userDetails["_id"],
                    Blog: { pic, blog },
                    Comment: req.body.Comment,
                    Like: req.body.Like,
                    Dislike: req.body.Dislike
                };

                let data = new usersPost(postData);
                await data.save();

                res.status(201).json({
                    message: "Post created successfully...."
                });
            }
            else {
                res.json({
                    message:"Blog size should be equal and less than 200...."
                });
            };

        } else {
            res.status(401).json({
                message:"user not Authorization"
            });
            
        };
    }
    catch (err) {
        res.status(400).json({
            message: "error"
        });
    };

};

// With this API user can see all post without login or signup

exports.seeAllPost = async (req, res) => {
    try {
        const posts = await usersPost.find()
        res.status(200).json({
            data:posts
        });
    }
    catch (error) {
        res.status(400).json({
            message:error
        });
    };
}


// Only Admin can update the post which he created

exports.EditPost = async (req, res) => {

    var userData = await usersPost.find({ user_email: req.user.Email });

    if (userData) {
        var UserId = await usersPost.findOne({ _id: req.params.id });
        if (UserId) {

            var Blog = req.body.blog;
            var Picture = req.file.filename;
            UserId.Blog = { Picture, Blog }
            // console.log(usersPost)
            await UserId.save()
            res.json({
                status: "success",
                data: UserId
            });
        }
        else {
            res.json("id is not valid");
        };
    }
    else {
        res.status(401).json({
            message:"user not Authorization"
        });
    };
};

//In this post's admin only can delete the post

exports.deletePost = async (req, res) => {

    var userDetails = await usersPost.find({ user_email: req.user.Email });
    if (userDetails) {
        // console.log(userDetails);
        var UserId = await usersPost.findOne({ _id: req.params.id });
        // console.log(UserId)
        if (UserId) {
            // console.log(UserId)
            usersPost.deleteOne(UserId, function (err, result) {
                if (err) throw err;
                if (result != 0) {
                    res.json("1 document deleted");
                }
                else {
                    res.json("document has not deleted");
                };
            });
        }
        else {
            res.json("id is not valid");
        };
    }
    else {
        res.status(401).json({
            message:"user not Authorization"
        });
    };
};

//User can see specific post which he want after login




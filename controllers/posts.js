const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
const User = require("../db_connection/userTable")
const usersPost = require("../db_connection/postTable");
const { deleteOne } = require("../db_connection/userTable");
const app = express();
app.use(express.json());



exports.createPost = async (req, res) => {
    try {
        user_email = req.user.Email;
        // console.log(user_email);
        var userDetails = await User.findOne({ user_email: user_email })
        // console.log(userDetails);
        if (userDetails) {
            let email = userDetails.user_email
            // console.log(email);
            let blog = req.body.Blog;
            var wordCount = blog.match(/(\w+)/g).length;
            // console.log(wordCount)

            if (wordCount <= 200) {
                const pic = req.file.filename
                const postData = {
                    Email: email,
                    Blog: { pic, blog },
                    Comment: req.body.Comment,
                    Like: req.body.Like,
                    Dislike: req.body.Dislike
                };
                // console.log(postData)
                let data = new usersPost(postData);
                await data.save();

                res.send({
                    status: "success",
                    data: data
                });
            }
            else {
                console.log("The Blog should have maximum 200 or less than 200 words are allowed")
            };
        } else {
            res.send({
                status: "error",
                message: "you need to login first"
            });
        };
    }
    catch (err) {
        res.send({
            status: "error"
        })
    }

};

exports.seeAllPost = async (req, res) => {
    try {
        const posts = await usersPost.find()
        res.json(posts);
    }
    catch (error) {
        res.status(500).send(error);
    };
}

exports.LikePost = async (req, res) => {
    var user_email = req.user.Email;
    // console.log(user_email);
    // finding the email address is in a database or not because should be login before like or dislike the post
    var userDetails = await User.findOne({ user_email: user_email });
    if (userDetails) {
        // console.log(userDetails)
        var Id = req.body.id
        //finding the post is exits in our database or not? by the post id
        var searchId = await usersPost.findOne({ _id: Id });
        if (searchId) {
            // console.log(searchId["Like"]) 
            var like = req.body.like;
            var dislike = req.body.Dislike
            if (like == "like") {
                // adding the value in database like
                var UserLike = searchId["Like"] + 1;
                // console.log(UserLike)
                searchId.Like = UserLike
                await searchId.save()
                res.send({
                    status: "success",
                    data: searchId
                })

            }
            else if (dislike == "Dislike") {
                // console.log(searchId)
                // adding the value in database dislike
                var UserDislike = searchId["Dislike"] + 1;
                // console.log(UserDislike)
                searchId.Dislike = UserDislike
                await searchId.save()
                res.send({
                    status: "success",
                    data: searchId
                })
            }
            else {
                console.log("sorry you can not do like and dislike thsi post")
            };

        }
        else {
            console.log("id not founded")
        };
    }
    else {
        console.log("data is not founded you need to login firts")
    };
};

exports.Comment = async (req, res) => {
    var user_email = req.user.Email;
    // console.log(user_email);
    // finding the email address is in a database or not because should be login before like or dislike the post
    var userDetails = await User.findOne({ user_email: user_email });
    if (userDetails) {
        var comment = req.body.comment
        var wordCount = comment.match(/(\w+)/g).length;
        if (wordCount <= 100) {
            var Id = req.body.id;
            //finding the post is exits in our database or not? by the post id
            var searchId = await usersPost.findOne({ _id: Id });
            if (searchId) {
                // console.log(searchId)
                var Usercomment = comment;
                // console.log(Usercomment)
                searchId.Comment.push(Usercomment)
                await searchId.save()
                res.send({
                    status: "success",
                    data: searchId
                });
            }
            else {
                console.log("id not founded please enter right id");
            };
        }
        else {
            console.log("comment should be less than and equal to 100 words")
        }
    }
    else {
        console.log("data is not there");
    };
};


exports.EditPost = async (req, res) => {
    var Email = req.body.email;
    var userDetails = await usersPost.findOne({ user_email: Email });
    // console.log(userDetails);
    if (userDetails) {
        var Blog = req.body.blog;
        var Picture = req.file.filename;
        userDetails.Blog = { Picture, Blog }
        await userDetails.save()
                res.send({
                    status: "success",
                    data: userDetails
                });
    }
    else {
        console.log("data is not founded")
    };
};

exports.deletePost = async(req,res)=>{
    var Email = req.body.email;
    var userDetails = await usersPost.findOne({ user_email: Email });
    if (userDetails) {
        // console.log(userDetails);
        usersPost.deleteOne(userDetails, function(err) {
            if (err) throw err;
            console.log("1 document deleted");
          });
        
        res.send({
            status:"deleted successfully"
        })
        
    }
    else {
        console.log("data is not founded")
    };

};


exports.UserProfileAndPost = async(req,res)=>{
   try{ 
       var user_email = req.user.Email;
    // console.log(user_email);
    // finding the email address is in a database or not because should be login before like or dislike the post
        var userDetails = await User.findOne({ user_email: user_email });
        if(userDetails){
            const posts = await usersPost.find()
            res.json(posts);
        }
        else{
            res.send("data is not founded");
        }
    }catch{
        res.send("do login first");
    };
};
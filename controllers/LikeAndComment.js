const commentTable = require("../db_connection/commentTab");
const express = require("express");
const User = require("../db_connection/userTable")
const usersPost = require("../db_connection/postTable");
const LikeSchema = require("../db_connection/LikesSchema")


// In this we are allowing to user do comment on his/her post on their faivorte post 

exports.LikePost = async (req, res) => {

    var userDetails = await User.findOne({ user_email: req.user.Email });
    if (userDetails) {
        var postId = await usersPost.findOne({ _id: req.params.id });
        if (postId) {
            // console.log(postId["_id"])
            var findUserId = await LikeSchema.find({ UserId: userDetails["_id"] });
            // console.log(findUserId)

            if (!findUserId) {

                var like = postId["Like"] + 1;
                const userLike = {
                    UserId: userDetails["_id"],
                    PostId: postId["_id"],
                    Like: 1
                };

                var likes = new LikeSchema(userLike);
                // console.log(likes)
                postId.Like = like
                await postId.save()
                await likes.save()
                res.status(200).json({
                    status: `${userDetails["user_name"]} has liked the post`,
                    data: likes
                });

            } else if (findUserId) {

                var findPostId = 0;
                for (let i = 0; i < findUserId.length; i++) {
                    if (findUserId[i]["PostId"] == req.params.id) {
                        findPostId = findUserId[i]["PostId"];
                    };

                };
                if (!findPostId) {
                    var like = postId["Like"] + 1;
                    const userLike = {
                        UserId: userDetails["_id"],
                        PostId: postId["_id"],
                        Like: 1
                    };

                    var likes = new LikeSchema(userLike);
                    postId.Like = like
                    await postId.save()
                    await likes.save()
                    res.status(200).json({
                        message: `${userDetails["user_name"]} has liked the post`
                    });
                }
                else {
                    res.json({
                        message: `${userDetails["user_name"]} has already liked this post`
                    });
                }

            } else {
                res.json({
                    message: `${userDetails["user_name"]} has already liked this post`
                });
            };
        }
        else {
            res.status(401).json({
                message:"This Post Id is not exits"
            });
        };
    }
    else {
        res.status(401).json({
            message:"user not Authorization"
        });
    };
};

exports.Comment = async (req, res) => {

    // finding the email address is in a database or not because should be login before like or dislike the post
    var userDetails = await User.find({ user_email: req.user.Email });

    if (userDetails.length != 0) {

        var wordCount = req.body.comment.match(/(\w+)/g).length;

        if (wordCount <= 100) {

            //finding the post is exits in our database or not? by the post id
            var searchId = await usersPost.findOne({ _id: req.params.id });
            // console.log(searchId["_id"]);

            if (searchId) {

                var userComment = {
                    UserId: userDetails[0]["_id"],
                    PostId: searchId["_id"],
                    Comment: req.body.comment
                };
                var comments = new commentTable(userComment);
                // console.log(comments)
                await comments.save()
                res.status(200).json({
                    message: "you commented"
                });
            }
            else {
                res.status(401).json({
                    message:"id not founded please enter right id"
                });
            };
        }
        else {
            res.json({
                message:"comment should be less than and equal to 100 words"
            });
        };
    }
    else {
        res.status(401).json({
            message:"user not Authorization"
        });
    };
};

// // If user want to delete the comment which he did so he can by this api

exports.deleteComment = async (req, res) => {

    var userDetails = await User.find({ user_email: req.user.Email });
    if (userDetails) {
        // console.log(userDetails)
        var commitId = await commentTable.find({ _id: req.params.id });

        if (commitId) {
            // console.log(commitId[0]);
            commentTable.deleteOne(commitId[0], function (err, result) {
                if (err) throw err;
                if (result != 0) {
                    res.status(200).json({
                        message:"1 comment deleted"
                    });
                }
                else {
                    res.status(303).json({
                        message:"comment has not deleted"
                    });
                };
            });
        } else {
            res.json({
                message:"id is not valid"
            });
        };

    } else {
        res.status(401).json({
            message:"user not Authorization"
        });
    };

};

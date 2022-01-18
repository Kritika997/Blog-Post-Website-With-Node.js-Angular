const commentTable = require("../model/commentTab");
const User = require("../model/userTable")
const usersPost = require("../model/postTable");
const LikeSchema = require("../model/LikesSchema");
const comapnayWallet = require("../model/companyWallet");

// In this we are allowing to user do comment on his/her post on their faivorte post 

exports.likePost = async (req, res) => {

    try {
        companyBalance = await comapnayWallet.findOne()

        var userDetails = await User.findOne({ _id: req.user.ID });

        if (userDetails) {

            var postId = await usersPost.findOne({ _id: req.params.id });
            if (postId) {

                var findUserId = await LikeSchema.find({ UserId: userDetails["_id"] });

                if (!findUserId) {

                    addAmmount = userDetails["walletAMount"] + 15
                    cutFromCompnay = companyBalance["balance"] - addAmmount
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
                    userDetails.walletAMount = addAmmount
                    userDetails.save()
                    companyBalance.balance = cutFromCompnay
                    companyBalance.save()
                    return res.status(200).send({
                        status: ` You Have liked this post`,
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
                        userDetails.walletAMount = userDetails["walletAMount"] + 15
                        userDetails.save()
                        companyBalance.balance = companyBalance["balance"] - 15
                        companyBalance.save()
                        return res.status(200).send({
                            message: `You Have liked this post`
                        });
                    }
                    else {
                        return res.status(401).send({
                            message: `user have already liked this post`
                        });
                    }

                } else {

                    return res.status(404).send({
                        message: `You have already liked this post`
                    });
                };
            }
            else {
                return res.status(401).send({
                    message: "This Post Id is not exits"
                });
            };
        }
        else {
            return res.status(401).send({
                message: "user not Authorization"
            });
        };
    }
    catch (err) {
        res.status(400).send({
            message: "something went wrong"
        })

    }
};

exports.Comment = async (req, res) => {

    // finding the email address is in a database or not because should be login before like or dislike the post
    try {
        companyBalance = await comapnayWallet.findOne()

        var userDetails = await User.findOne({ _id: req.user.ID });

        if (userDetails) {

            var wordCount = req.body.comment.match(/(\w+)/g).length;

            if (wordCount <= 100) {


                var searchId = await usersPost.findOne({ _id: req.params.id });
                // console.log(searchId["Comment"]);

                if (searchId) {

                    var commentCount = searchId["Comment"] + 1;
                    // console.log(commentCount)
                    var userComment = {
                        UserId: userDetails["_id"],
                        PostId: searchId["_id"],
                        Comment: req.body.comment
                    };
                    var comments = new commentTable(userComment);
                    await comments.save()


                    searchId.Comment = commentCount;
                    searchId.save()
                    userDetails.walletAMount = userDetails["walletAMount"] + 20
                    userDetails.save()
                    companyBalance.balance = companyBalance["balance"] - 20
                    companyBalance.save()
                    return res.status(200).send({
                        message: "you commented"
                    });
                }
                else {
                    return res.status(401).send({
                        message: "id not founded please enter right id"
                    });
                };
            }
            else {
                return res.status(411).send({
                    message: "comment should be less than or equal to 100 words"
                });
            };
        }
        else {
            return res.status(530).send({
                message: "user not Authorization"
            });
        };
    }
    catch (err) {
        res.status(400).send({
            message: "something wrong"
        })
    }
};
// // If user want to delete the comment which he did so he can by this api

exports.deleteComment = async (req, res) => {
    // console.log(req.params)

    try {        
        var commitId = await commentTable.findOne({ _id: req.params.id, UserId: req.user.ID });
        // console.log(commitId)
        if (commitId) {
            var searchId = await usersPost.findOne({ _id: commitId["PostId"] });
            console.log(searchId)
            commentTable.deleteOne(commitId, function (err, result) {
                if (err) throw err;
                if (result != 0) {

                    var deleteCount = searchId["Comment"] - 1;
                    searchId.Comment = deleteCount;

                    searchId.save()

                    return res.status(200).send({
                        message: "1 comment deleted"
                    });
                }
                else {
                    return res.status(303).send({
                        message: "comment has not deleted"
                    });
                };
            });
            
        } else {
            return res.status(401).send({
                message: "user not Authorization"
            });
        };

    }
    catch (err) {
        res.status(400).send({
            message: "soething went wrong"
        })
    }
};

exports.userComments = async (req, res) => {

    await commentTable.find({ PostId: req.params.id }).populate("UserId").exec((err, result) => {
        if (err) {

            return res.send("data is not there");
        }
        else {
            return res.send(result);
        };
    });
};

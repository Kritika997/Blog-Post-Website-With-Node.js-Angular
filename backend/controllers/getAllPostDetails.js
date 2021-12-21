const User = require("../model/userTable")
const usersPost = require("../model/postTable");
const commentTable = require("../model/commentTab");
const LikeSchema = require("../model/LikesSchema");
const connect = require("../model/db_connect")

exports.usersPosts = async (req, res) => {

    await usersPost.aggregate([
 
      {
        $lookup:
        {
          from: "userdetails",
          localField: "UserId",
          foreignField: "_id",
          as: "WhoCreated",
          
        },
        
      },

      {
        $lookup: {
          from: "usercomments",
          localField: "_id",
          foreignField: "PostId",
          as: "comments",
        },  
      },

      // {
      //   comments
      // }
    
      {
        $lookup: {
          from: "liketabs",
          localField: "_id",
          foreignField: "PostId",
          as: "likes"
        },
      },

    ])
      .exec((err, result) => {
        if (err) {
          return res.json("data is not there");
        }
        else {
         return res.json(result);
        };
      });
};
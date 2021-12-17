const User = require("../db_connection/userTable")
const usersPost = require("../db_connection/postTable");
const commentTable = require("../db_connection/commentTab");
const LikeSchema = require("../db_connection/LikesSchema");
const connect = require("../db_connection/db_connect")

exports.userPostAllDetails = async (req, res) => {

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
          res.jaon("data is not there");
        }
        else {
          res.json(result);
        };
      });
};
const { builtinModules } = require("module");
const usersPost = require("../db_connection/postTable");

module.exports ={

    
        async getUserPostlet userData = await usersPost.find({ user_email: req.user.Email });
        return

}
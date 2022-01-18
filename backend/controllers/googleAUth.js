const { userDetailsById, signUp } = require("../controllers/signupAndLogin");
const User = require("../model/userTable");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => { 
    try{
    const user_info = req.user._json;  

    const userData = await User.findOne({ user_email: user_info.email }); 

    if (userData) {

        var token = jwt.sign({ Email:userData["user_email"],ID: userData["_id"] }, "loginToken", {
            expiresIn: '365d'
        });   
        

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 356
        });

        res.redirect('http://localhost:4200/googleLogin');

    } else {

        const infoOfUser = {
            googleID: user_info.sub,
            user_name: user_info.name,
            user_email: user_info.email,                   
            user_profilePic: user_info.picture,
        };

        let userModel = new User(infoOfUser);
        await userModel.save();

        res.redirect('http://localhost:4200/login');
    }

    }catch(err){
       console.log(err);    
    };

};



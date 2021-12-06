const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    user_name:{
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    user_gender:{
        type: String,
        required: true
    },
    user_profilePic:{
        type: String,
        required: true
    },
    user_location:{
        type:String,
        required: true
    },
    user_password:{
        type: String,
        required: true
    }
},
    {timestamps:true
});

const postdata = mongoose.model('UserDetails',userData);


module.exports = postdata;


// table schema for storing the user data while signup in database
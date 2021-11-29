const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    user_name:{
        type: 'string',
        required: true
    },
    user_email:{
        type: 'string',
        required: true
    },
    user_gender:{
        type: 'string',
        required: true
    },
    user_profilePic:{
        type: 'string',
        required: true
    },
    user_location:{
        type: 'string',
        required: true
    },
    user_password:{
        type: 'string',
        required: true
    },
    resetToken:String,
    expireToken:Date,
});

const postdata = mongoose.model('UserDetails',userData);


module.exports = postdata;
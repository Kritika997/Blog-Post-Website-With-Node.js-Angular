const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    user_name:{
        type: 'string',
    },
    user_email:{
        type: 'string',
    },
    user_gender:{
        type: 'string',
    },
    user_profilePic:{
        type: 'string'
    },
    user_location:{
        type: 'string',
    },
    user_password:{
        type: 'string',
    }
});

const postdata = mongoose.model('postData',userData);
module.exports =postdata;
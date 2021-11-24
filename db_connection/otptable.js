const mongoose = require('mongoose');

const userOtp = new mongoose.Schema({
    user_email:{
        type: 'string',
    },
    code:{
        type: 'string',
    },
    expireIn:{
        type:Number
    }
});

let otp = mongoose.model('otp',userOtp,'otp');

module.exports = otp;
    
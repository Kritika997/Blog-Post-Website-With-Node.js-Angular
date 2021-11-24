const mongoose = require('mongoose');

const userPost = new mongoose.Schema({
    Blog:{
        type: 'string',
        maxLength: 200
    },
    Picture:{
        type: 'string',
    },
    Comment:{
        type:'string',
        maxLength: 100
    },
    Like:{
        type:Number
    },
    Dislike:{
        type:Number
    }
});

let post = mongoose.model('usersPost',userPost);

module.exports = post;
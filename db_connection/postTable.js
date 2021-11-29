const mongoose = require('mongoose');

const userPost = new mongoose.Schema({
    Email:{
        type:String
    },
    Blog: {
        type: Object
    },
    Comment: {
        type: Array
    },
    Like: {
        type: Number
    },
    Dislike: {
        type: Number
    }
});

let post = mongoose.model('postsbyuser', userPost);

module.exports = post;
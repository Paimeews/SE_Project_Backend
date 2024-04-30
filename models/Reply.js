const mongoose = require('mongoose');

const ReplySchema=new mongoose.Schema({
    replyContent: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    review: {
        type: mongoose.Schema.ObjectId,
        ref: 'Review',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports=mongoose.model('Reply',ReplySchema);
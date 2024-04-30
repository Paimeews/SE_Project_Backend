const mongoose = require('mongoose');

const HistorySchema=new mongoose.Schema({
    content : {
        type : String,
        required:true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
},);

module.exports=mongoose.model('History',HistorySchema);
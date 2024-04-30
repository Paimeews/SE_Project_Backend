const mongoose = require('mongoose');

const ReviewSchema=new mongoose.Schema({
    content : {
        type : String,
        required:true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },

    campground : {
        type: mongoose.Schema.ObjectId,
        ref: 'Campground',
        required:true

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
},{
    toJSON : {virtuals:true},
    toObject: {virtuals:true}
});

//Reverse populate with virtuals
ReviewSchema.virtual('replys',{
    ref : 'Reply',
    localField: '_id',
    foreignField: 'review',
    justOne: false
});

//Cascade delete appointments when a hospital is deleted
ReviewSchema.pre('deleteOne', {document:true , query: false} ,async function(next){
    console.log(`Replys being removed from review ${this._id}`);
    await this.model('Review').deleteMany({review:this._id});
    next();
});

module.exports=mongoose.model('Review',ReviewSchema);
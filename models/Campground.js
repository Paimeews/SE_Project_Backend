const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
name : {
   type: String,
   required: [true, 'Plese add a name'],
   unique: true,
   trim: true,
   maxlength:[50,'Name can not be more than 50 characters']


},
address:{
  type: String,
  required: [true,'Please add an address']

}, 
 picture : {
  type : String,
  required : [true, 'Please add an address']
},
 tel:{
  type: String
  
 },
 activity : {
  type : String ,
  required : [true, 'Please add an activity']
 },
 country : {
  type : String ,
 },
tag : {
 type : [String]
},
 avgRate: {
  type: Number,
 },
 totalRate: {
  type: Number
 }
},{
    toJSON : {virtuals:true},
    toObject: {virtuals:true}
});

//Reverse populate with virtuals
CampgroundSchema.virtual('bookings',{
    ref : 'Booking',
    localField: '_id',
    foreignField: 'campground',
    justOne: false
});

//Cascade delete appointments when a hospital is deleted
CampgroundSchema.pre('deleteOne', {document:true , query: false} ,async function(next){
    console.log(`Bookings being removed from campground ${this._id}`);
    await this.model('Booking').deleteMany({campground:this._id});
    next();
});

module.exports=mongoose.model('Campground',CampgroundSchema);


const Review = require('../models/Review');
const Campground = require('../models/Campground');
const User = require('../models/User');

//@desc Get all reviews
//@route GET /api/v1/campgroundID/reviews
//@access Public
exports.getReviews = async (req,res,next)=> {
   let query;   
    if (req.params.campgroundId) {
        query = Review.find({campground: req.params.campgroundId}).populate({
           path:"user",
           select: "name",
        });

        

    } else {
    
    query=Review.find().populate({
     path:'user',
     select: "name"
    });
   }
   
   try {
    const reviews = await query;

    res.status(200).json({
        success:true,
        count: reviews.length,
        data:reviews
    });
   } catch (err) {
       console.log(err.stack);
       return res.status(500).json({
        success:false,
        message:"cannot find Review"
       });
   }
} 

//@desc Get single review
//@route GET /api/v1/campgroundID/review
//@access Public
exports.getReview=async (req,res,next)=> {
   

 try {
    const review = await Review.findById(req.params.id).populate({
        path: 'campground',
        select: 'name address tel'
    });
    
    if (!review) {
        return res.status(404).json({success:false, message: `No review with the id of ${req.params.id}`});

    }
      res.status(200).json({success: true, data:review});
   

    

 } catch (err) {
    console.log(err.stack);
    return res.status(500).json({success:false,message: 'Cannot find Review'});
 }
}

//@desc Add single appointments
//@route POST /api/v1/campgrounds/:campgroundId/appointments/
//@access Private
exports.addReview=async (req,res,next)=> {
   try {
     req.body.campground=req.params.campgroundId;

     const campground=await Campground.findById(req.params.campgroundId);
     if (!campground) {
        return res.status(404).json({success: false, message: `No campground with the id of ${req.params.campgroundId}`});
     }

   //add user Id to req.body
//    req.body.user=req.user.id;

// // //Check for existed booking
// const exitedBookings = await Booking.find({user:req.user.id});

// //if the user is not an admin, they can only create 3 appointment.
// if (exitedBookings.length >= 4 && req.user.role !== 'admin') {
//     return res.status(400).json({success:false,message:`The user with ID ${req.user.id} has already made 4 bookings`});
//   }
//   if (req.body.night > 3) {
//    return res.status(400).json({success:false,message:"You cannot book more than 3 nights"});
//   }
  const review = await Review.create(req.body);
  res.status(201).json({success:true, data: review});



   } catch(err) {
     console.log(err.stack);
     return res.status(500).json({success:false,message:'Cannot create review'});
   }
}

// //@desc Update appointments
// //@route PUT /api/v1/hospitals/:hospitalId/appointments/
// //@access Private
// exports.updateBooking=async (req,res,next)=> {
//     try {
//       let booking = await Booking.findById(req.params.id);
 
      
//       if (!booking) {
//          return res.status(404).json({success: false, message: `No booking with the id of ${req.params.id}`});
//       }

//       //Make sure user is the appointment owner
//     if(booking.user.toString()!==req.user.id && req.user.role !== 'admin') {
//    return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to update this booking`});
//     }
      
//       booking=await Booking.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true
//       });

//       res.status(200).json({
//         success:true,
//         data:booking
//       });
 
//     } catch(error) {
//       console.log(error);
//       return res.status(500).json({success:false,message:'Cannot update to Booking'});
//     }
//  };

 exports.deleteReview = async (req,res,next)=> {
    try{
       const review = await Review.findById(req.params.id);
      
      if (!review) {
         return res.status(404).json({success: false, message: `No review with the id of ${req.params.id}`});
      }

      //Make sure user is the appointment owner
//    if  (review.user.toString()!==req.user.id && req.user.role !== 'admin') {
//    return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this review`});
//      }
      
      await review.deleteOne();

      res.status(200).json({
        success:true,
        data:{}
      })
 
    } catch(error) {
      console.log(error);
      return res.status(500).json({success:false,message:'Cannot delete review'});
    }
 };

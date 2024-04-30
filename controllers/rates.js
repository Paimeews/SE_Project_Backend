const Rate = require('../models/rate');
const Campground = require('../models/Campground');
const User = require('../models/User');

//@desc Get all rates
//@route GET /api/v1/campgroundID/rates
//@access Public
exports.getRates = async (req,res,next)=> {
   let query;   
    if (req.params.campgroundId) {
        query = Rate.find({campground: req.params.campgroundId}).populate({
           path:"user",
           select: "name",
        });

        

    } else {
    
    query=Rate.find().populate({
     path:'user',
     select: "name"
    });
   }
   
   try {
    const rates = await query;

    res.status(200).json({
        success:true,
        count: rates.length,
        data:rates
    });
   } catch (err) {
       console.log(err.stack);
       return res.status(500).json({
        success:false,
        message:"cannot find Rate"
       });
   }
} 

//@desc Get single rate
//@route GET /api/v1/campgroundID/rate
//@access Public
exports.getRate=async (req,res,next)=> {
   

 try {
    const rate = await Rate.findById(req.params.id).populate({
        path: 'campground',
        select: 'name address tel'
    });
    
    if (!rate) {
        return res.status(404).json({success:false, message: `No rate with the id of ${req.params.id}`});

    }
      res.status(200).json({success: true, data:rate});
   

    

 } catch (err) {
    console.log(err.stack);
    return res.status(500).json({success:false,message: 'Cannot find Rate'});
 }
}

//@desc Add single appointments
//@route POST /api/v1/campgrounds/:campgroundId/appointments/
//@access Private
exports.addRate=async (req,res,next)=> {
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
  const rate = await Rate.create(req.body);
  res.status(201).json({success:true, data: rate});



   } catch(err) {
     console.log(err.stack);
     return res.status(500).json({success:false,message:'Cannot create rating'});
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

//  exports.deleteRate = async (req,res,next)=> {
//     try{
//        const rate = await Rate.findById(req.params.id);
      
//       if (!rate) {
//          return res.status(404).json({success: false, message: `No rate with the id of ${req.params.id}`});
//       }

//       //Make sure user is the appointment owner
// //    if  (rate.user.toString()!==req.user.id && req.user.role !== 'admin') {
// //    return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this rate`});
// //      }
      
//       await rate.deleteOne();

//       res.status(200).json({
//         success:true,
//         data:{}
//       })
 
//     } catch(error) {
//       console.log(error);
//       return res.status(500).json({success:false,message:'Cannot delete rate'});
//     }
//  };

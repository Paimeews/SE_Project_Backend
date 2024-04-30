const Booking = require('../models/Booking');
const Campground = require('../models/Campground');
//@desc Get all appointments
//@route GET /api/v1/appointments
//@access Private
exports.getBookings=async (req,res,next)=> {
   let query;
   //General users can see only their Bookings!
   if (req.user.role !== 'admin') {
      query=Booking.find({user:req.user.id}).populate({
         path : 'campground',
         select : 'name address tel'        
      });
       
   } else {
    if (req.params.campgroundID) {
        console.log(req.params.campgroundId);
        query = Booking.find({campground: req.params.campgroundId}).populate({
           path:"campground",
           select: "name address tel",
        });

    } else {
    query=Booking.find().populate({
     path:'campground',
     select: 'name address tel'
    });}
   }
   try {
    const bookings = await query;

    res.status(200).json({
        success:true,
        count: bookings.length,
        data:bookings
    });
   } catch (err) {
       console.log(err.stack);
       return res.status(500).json({
        success:false,
        message:"cannot find Booking"
       });
   }
} 

//@desc Get single appointments
//@route GET /api/v1/appointments/:id
//@access Public
exports.getBooking=async (req,res,next)=> {
   

 try {
    const booking = await Booking.findById(req.params.id).populate({
        path: 'campground',
        select: 'name address tel'
    });
    
    if (!booking) {
        return res.status(404).json({success:false, message: `No booking with the id of ${req.params.id}`});

    }
    if (booking.user.toString()!==req.user.id && req.user.role !== 'admin') {
         return res.status(401).json({success:false, message : "You cannot view this booking"});
    } 
      res.status(200).json({success: true, data:booking});
   

    

 } catch (err) {
    console.log(err.stack);
    return res.status(500).json({success:false,message: 'Cannot find Booking'});
 }
}

//@desc Add single appointments
//@route POST /api/v1/campgrounds/:campgroundId/appointments/
//@access Private
exports.addBooking=async (req,res,next)=> {
   try {
     req.body.campground=req.params.campgroundId;

     const campground=await Campground.findById(req.params.campgroundId);
     if (!campground) {
        return res.status(404).json({success: false, message: `No campground with the id of ${req.params.campgroundId}`});
     }

   //add user Id to req.body
   req.body.user=req.user.id;

// //Check for existed booking
const exitedBookings = await Booking.find({user:req.user.id});

//if the user is not an admin, they can only create 3 appointment.
if (exitedBookings.length >= 4 && req.user.role !== 'admin') {
    return res.status(400).json({success:false,message:`The user with ID ${req.user.id} has already made 4 bookings`});
  }
  if (req.body.night > 3) {
   return res.status(400).json({success:false,message:"You cannot book more than 3 nights"});
  }
  const booking = await Booking.create(req.body);
  res.status(201).json({success:true, data: booking});



   } catch(err) {
     console.log(err.stack);
     return res.status(500).json({success:false,message:'Cannot create booking'});
   }
}

//@desc Update appointments
//@route PUT /api/v1/hospitals/:hospitalId/appointments/
//@access Private
exports.updateBooking=async (req,res,next)=> {
    try {
      let booking = await Booking.findById(req.params.id);
 
      
      if (!booking) {
         return res.status(404).json({success: false, message: `No booking with the id of ${req.params.id}`});
      }

      //Make sure user is the appointment owner
    if(booking.user.toString()!==req.user.id && req.user.role !== 'admin') {
   return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to update this booking`});
    }
      
      booking=await Booking.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
      });

      res.status(200).json({
        success:true,
        data:booking
      });
 
    } catch(error) {
      console.log(error);
      return res.status(500).json({success:false,message:'Cannot update to Booking'});
    }
 };

 exports.deleteBooking=async (req,res,next)=> {
    try{
       const booking = await Booking.findById(req.params.id);
      
      if (!booking) {
         return res.status(404).json({success: false, message: `No booking with the id of ${req.params.id}`});
      }

      //Make sure user is the appointment owner
   if (booking.user.toString()!==req.user.id && req.user.role !== 'admin') {
   return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this booking`});
     }
      
      await booking.deleteOne();

      res.status(200).json({
        success:true,
        data:{}
      })
 
    } catch(error) {
      console.log(error);
      return res.status(500).json({success:false,message:'Cannot delete Booking'});
    }
 };

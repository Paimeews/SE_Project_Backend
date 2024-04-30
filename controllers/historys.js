const History = require('../models/History');

//@desc Get all appointments
//@route GET /api/v1/appointments
//@access Private
exports.getHistorys=async (req,res,next)=> {
   let query;
   //General users can see only their Historys!
   if (req.user.role !== 'admin') {
      query=History.find({user:req.user.id});
       
   } else {
    
    query=History.find();

   }
   console.log(req.user.role);
   try {
    const historys = await query;

    res.status(200).json({
        success:true,
        count: historys.length,
        data:historys
    });
   } catch (err) {
       console.log(err.stack);
       return res.status(500).json({
        success:false,
        message:"Cannot find Historys"
       });
   }
} 

//@desc Get single appointments
//@route GET /api/v1/appointments/:id
//@access Public
// exports.getBooking=async (req,res,next)=> {
   

//  try {
//     const booking = await Booking.findById(req.params.id).populate({
//         path: 'campground',
//         select: 'name address tel'
//     });
    
//     if (!booking) {
//         return res.status(404).json({success:false, message: `No booking with the id of ${req.params.id}`});

//     }
//     if (booking.user.toString()!==req.user.id && req.user.role !== 'admin') {
//          return res.status(401).json({success:false, message : "You cannot view this booking"});
//     } 
//       res.status(200).json({success: true, data:booking});
   

    

//  } catch (err) {
//     console.log(err.stack);
//     return res.status(500).json({success:false,message: 'Cannot find Booking'});
//  }
// }

//@desc Add single appointments
//@route POST /api/v1/campgrounds/:campgroundId/appointments/
//@access Private
exports.addHistory=async (req,res,next)=> {
   try {
   //add user Id to req.body
   req.body.user=req.user.id;


  const history = await History.create(req.body);
  res.status(201).json({success:true, data: history});



   } catch(err) {
     console.log(err.stack);
     return res.status(500).json({success:false,message:'Cannot create History'});
   }
}

//@desc Update appointments
//@route PUT /api/v1/hospitals/:hospitalId/appointments/
//@access Private
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

//  exports.deleteBooking=async (req,res,next)=> {
//     try{
//        const booking = await Booking.findById(req.params.id);
      
//       if (!booking) {
//          return res.status(404).json({success: false, message: `No booking with the id of ${req.params.id}`});
//       }

//       //Make sure user is the appointment owner
//    if (booking.user.toString()!==req.user.id && req.user.role !== 'admin') {
//    return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this booking`});
//      }
      
//       await booking.deleteOne();

//       res.status(200).json({
//         success:true,
//         data:{}
//       })
 
//     } catch(error) {
//       console.log(error);
//       return res.status(500).json({success:false,message:'Cannot delete Booking'});
//     }
//  };

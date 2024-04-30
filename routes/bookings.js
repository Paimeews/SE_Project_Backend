const express = require('express');
const {getBookings,getBooking,addBooking,updateBooking, deleteBooking} = require('../controllers/bookings');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - bookDate
 *         - user
 *         - campground
 *         - night
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the booking
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         bookDate:
 *           type: date
 *           description: Booking's Date
 *         user:
 *           type: object
 *           description: Booking's owner
 *         campground:
 *           type: object
 *           description: Booked campground
 *         createdAt:
 *           type: date
 *           description: Booking's created time
 *         night:
 *           type: integer
 *           description: Booking's night
 *       example:
 *         id: 6607c718caec81241a847878
 *         bookDate: 2024-03-07T17:00:00.000+00:00
 *         user: 6607c6d7c92110aee338c1cf
 *         campground: 65fd99a7b477d9016553c761
 *         createdAt: 2024-03-05T17:00:00.000+00:00
 *         night: 2
 */
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: The bookings managing API
 */
/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Returns the list of all bookings of that user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of all bookings of that user was successfully return
 *       500:
 *         description: Cannot find booking
 */
/**
 * @swagger
 * /bookings/{bid}:
 *   get:
 *     summary: Returns the booking by the id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bid
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The specific booking was successfully return
 *       401:
 *         description: You cannot view this booking
 *       404:
 *         description: No booking with this id
 *       500:
 *         description: Cannot find booking
 */
/**
 * @swagger
 * /campgrounds/{bid}/bookings:
 *   post:
 *     summary: Add booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookDate:
 *                 type: string
 *                 format: date-time
 *               user:
 *                 type: string
 *               night:
 *                 type: integer
 *     parameters:
 *       - in: path
 *         name: bid
 *         schema:
 *           type: string
 *         required: true
 *         description: The campground id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *       400:
 *         description: The user has already made 4 bookings or the user cannot book more than 3 nights
 *       404:
 *         description: No campground with this id
 *       500:
 *         description: Cannot create booking
 */
/**
 * @swagger
 * /bookings/{bid}:
 *   put:
 *     summary: Update booking by the id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bid
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookDate:
 *                 type: string
 *                 format: date-time
 *               campground:
 *                 type: string
 *               night:
 *                 type: integer
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The booking was successfully updated
 *       401:
 *         description: User is not authorized to update this booking
 *       404:
 *         description: No booking with this id
 *       500:
 *         description: Cannot update booking
 */
/**
 * @swagger
 * /bookings/{bid}:
 *   delete:
 *     summary: Remove the booking by the id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bid
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The booking was successfully deleted
 *       401:
 *         description: User is not authorized to delete this booking
 *       404:
 *         description: No booking with this id
 *       500:
 *         description: Cannot delete booking
 */

const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth')

router.route('/').get(protect,getBookings).post(protect, authorize('admin','user'),addBooking);
router.route('/:id').get(protect,getBooking).put(protect, authorize('admin','user'),updateBooking).delete(protect, authorize('admin','user'),deleteBooking);
module.exports=router;
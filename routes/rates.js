const express = require('express');
// const {getBookings,getBooking,addBooking,updateBooking, deleteBooking} = require('../controllers/bookings');
const {getRates,getRate,addRate} = require('../controllers/rates');

const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth')

// router.route('/').get(protect,getBookings).post(protect, authorize('admin','user'),addBooking);
// router.route('/:id').get(protect,getBooking).put(protect, authorize('admin','user'),updateBooking).delete(protect, authorize('admin','user'),deleteBooking);
router.route('/').get(getRates).post(addRate)
router.route('/:id').get(getRate)
module.exports=router;


/**
 * @swagger
 * components: 
 *   schemas:
 *     Rate:
 *       type: object
 *       required:
 *         - rateContent
 *         - user
 *         - campground
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of rate
 *           example: 6621c394489b18f5e181b816
 *         rateContent:
 *           type: Number
 *           description: The number of rating value
 *           example: 5
 *         user:
 *           type: string
 *           format: uuid
 *           description: The ID of user
 *           example: 66157332e9c7e777ebeaa750
 *         campground:
 *           type: string
 *           format: uuid
 *           description: The ID of campground
 *           example: 65fd9a8ab477d9016553c764
 *         createdAt:
 *           type: Date
 *           description: The auto-generated create date
 *           example: 2024-04-19T01:06:28.246+00:00
 *       example:
 *         id: 6621c394489b18f5e181b816
 *         rateContent: 5
 *         user: 66157332e9c7e777ebeaa750
 *         campground: 65fd9a8ab477d9016553c764
 *         createdAt: 2024-04-19T01:06:28.246+00:00
 */

/**
 * @swagger
 * tags: 
 *   name: Rates
 *   description: The rates managing API
 */

/**
 * @swagger
 * /campgrounds/{cid}/rates:
 *   get:
 *     summary: Returns the list of all the campground's ratings
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: The campground's ID
 *     responses: 
 *       200:
 *         description: The list of all the rates
 *       500:
 *         description: Cannot find Rate
 */

/**
 * @swagger
 * /campgrounds/{cid}/rates:
 *   post:
 *     summary: Create a new rating
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: The campground's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rateContent:
 *                 type: number
 *                 description: Rating value
 *                 example: 5
 *               user:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of user
 *                 example: 66157332e9c7e777ebeaa750
 *               campground:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of campground
 *                 example: 65fd9a8ab477d9016553c764
 *           example:
 *             rateContent: 5
 *             user: 66157332e9c7e777ebeaa750
 *             campground: 65fd9a8ab477d9016553c764
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       201:
 *         description: Created a new rating
 *       404:
 *         description: The campground with this ID was not found
 *       500:
 *         description: Cannot create new rating
 */
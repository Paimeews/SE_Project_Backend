const express = require('express');
// const {getBookings,getBooking,addBooking,updateBooking, deleteBooking} = require('../controllers/bookings');
const {getHistorys,addHistory} = require('../controllers/historys');


const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth')

// router.route('/').get(protect,getBookings).post(protect, authorize('admin','user'),addBooking);
// router.route('/:id').get(protect,getBooking).put(protect, authorize('admin','user'),updateBooking).delete(protect, authorize('admin','user'),deleteBooking);


router.route('/').get(protect, getHistorys).post(protect, addHistory);
//router.route('/:id').get(getReview).delete(deleteReview);
module.exports=router;


/**
 * @swagger
 * components: 
 *   schemas:
 *     History:
 *       type: object
 *       required:
 *         - content
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of History
 *           example: 662a3d8784c860447616b491
 *         content:
 *           type: string
 *           description: Content of the history
 *           example: History example
 *         user:
 *           type: string
 *           format: uuid
 *           description: The ID of user
 *           example: 65e6be4058c9de1703ba9b3c
 *         createdAt:
 *           type: Date
 *           description: The auto-generated create date
 *           example: 2024-04-19T01:06:28.246+00:00
 *       example:
 *         id: 662a3d8784c860447616b491
 *         content: History example
 *         user: 65e6be4058c9de1703ba9b3c
 *         review: 6621c626489b18f5e181b97a
 *         createdAt: 2024-04-19T01:06:28.246+00:00
 */

/**
 * @swagger
 * tags: 
 *   name: Histories
 *   description: The user's history managing API
 */

/**
 * @swagger
 * /historys:
 *   get:
 *     summary: Returns the list of all the user's searching history
 *     tags: [Histories]
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: The list of all the user's searching history
 *       500:
 *         description: Cannot find History
 */

/**
 * @swagger
 * /historys:
 *   post:
 *     summary: Create a new history
 *     tags: [Histories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: History content
 *                 example: History example
 *               user:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of user
 *                 example: 65e6be4058c9de1703ba9b3c
 *           example:
 *             content: History example
 *             user: 65e30741129fdf3008bbb7f8
 *     responses: 
 *       201:
 *         description: Created a new history
 *       500:
 *         description: Cannot create new history
 */

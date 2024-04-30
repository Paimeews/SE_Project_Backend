const express = require('express');
// const {getBookings,getBooking,addBooking,updateBooking, deleteBooking} = require('../controllers/bookings');
const {getReplys,getReply,addReply} = require('../controllers/replys');

const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth')

// router.route('/').get(protect,getBookings).post(protect, authorize('admin','user'),addBooking);
// router.route('/:id').get(protect,getBooking).put(protect, authorize('admin','user'),updateBooking).delete(protect, authorize('admin','user'),deleteBooking);
router.route('/').get(getReplys).post(addReply)
router.route('/:id').get(getReply)
module.exports=router;


/**
 * @swagger
 * components: 
 *   schemas:
 *     Reply:
 *       type: object
 *       required:
 *         - replyContent
 *         - user
 *         - review
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of reply
 *           example: 6621c930489b18f5e181bb1d
 *         replyContent:
 *           type: string
 *           description: Content of the reply
 *           example: Reply example
 *         user:
 *           type: string
 *           format: uuid
 *           description: The ID of user
 *           example: 65e6be4058c9de1703ba9b3c
 *         review:
 *           type: string
 *           format: uuid
 *           description: The ID of review
 *           example: 6621c626489b18f5e181b97a
 *         createdAt:
 *           type: Date
 *           description: The auto-generated create date
 *           example: 2024-04-19T01:06:28.246+00:00
 *       example:
 *         id: 6621c930489b18f5e181bb1d
 *         content: Reply example
 *         user: 65e6be4058c9de1703ba9b3c
 *         review: 6621c626489b18f5e181b97a
 *         createdAt: 2024-04-19T01:06:28.246+00:00
 */

/**
 * @swagger
 * tags: 
 *   name: Replies
 *   description: The rates managing API
 */

/**
 * @swagger
 * /reviews/{reviewId}/replys:
 *   get:
 *     summary: Returns the list of all the review's replies
 *     tags: [Replies]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         description: The review's ID
 *     responses: 
 *       200:
 *         description: The list of all the replies
 *       500:
 *         description: Cannot find Reply
 */

/**
 * @swagger
 * /reviews/{reviewId}/replys:
 *   post:
 *     summary: Create a new reply
 *     tags: [Replies]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         description: The review's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               replyContent:
 *                 type: string
 *                 description: Reply content
 *                 example: Reply example
 *               user:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of user
 *                 example: 65e6be4058c9de1703ba9b3c
 *           example:
 *             replyContent: Reply example
 *             user: 65e30741129fdf3008bbb7f8
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       201:
 *         description: Created a new reply
 *       500:
 *         description: Cannot create new reply
 */

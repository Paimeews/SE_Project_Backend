const express = require('express');
// const {getBookings,getBooking,addBooking,updateBooking, deleteBooking} = require('../controllers/bookings');
const {getReviews,getReview,addReview,deleteReview} = require('../controllers/reviews');

const replysRouter = require("./replys")

const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../middleware/auth')

router.use('/:reviewId/replys/',replysRouter)

// router.route('/').get(protect,getBookings).post(protect, authorize('admin','user'),addBooking);
// router.route('/:id').get(protect,getBooking).put(protect, authorize('admin','user'),updateBooking).delete(protect, authorize('admin','user'),deleteBooking);


router.route('/').get(getReviews).post(addReview);
router.route('/:id').get(getReview).delete(deleteReview);
module.exports=router;


/**
 * @swagger
 * components: 
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - content
 *         - user
 *         - campground
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of review
 *           example: 6621c626489b18f5e181b97a
 *         content:
 *           type: string
 *           description: Content of the review
 *           example: Review example
 *         user:
 *           type: string
 *           format: uuid
 *           description: The ID of user
 *           example: 65e30741129fdf3008bbb7f8
 *         campground:
 *           type: string
 *           format: uuid
 *           description: The ID of campground
 *           example: 65fd9bdeb477d9016553c767
 *         createdAt:
 *           type: Date
 *           description: The auto-generated create date
 *           example: 2024-04-19T01:06:28.246+00:00
 *       example:
 *         id: 6621c626489b18f5e181b97a
 *         content: Review example
 *         user: 65e30741129fdf3008bbb7f8
 *         campground: 65fd9bdeb477d9016553c767
 *         createdAt: 2024-04-19T01:06:28.246+00:00
 */

/**
 * @swagger
 * tags: 
 *   name: Reviews
 *   description: The reviews managing API
 */

/**
 * @swagger
 * /campgrounds/{cid}/reviews:
 *   get:
 *     summary: Returns the list of all the campground's reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: The campground's ID
 *     responses: 
 *       200:
 *         description: The list of all the reviews
 *       500:
 *         description: Cannot find Review
 */

/**
 * @swagger
 * /campgrounds/{cid}/reviews/{reviewId}:
 *   get:
 *     summary: Returns the required review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: The campground's ID
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         description: The review's ID
 *     responses: 
 *       200:
 *         description: The required review
 *       404:
 *         description: No review with this ID
 *       500:
 *         description: Cannot find Review
 */

/**
 * @swagger
 * /campgrounds/{cid}/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
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
 *               content:
 *                 type: string
 *                 description: Review content
 *                 example: Review example
 *               user:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of user
 *                 example: 65e30741129fdf3008bbb7f8
 *           example:
 *             content: Review example
 *             user: 65e30741129fdf3008bbb7f8
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       201:
 *         description: Created a new review
 *       404:
 *         description: The campground with this ID was not found
 *       500:
 *         description: Cannot create new review
 */

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete the review by its ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The review's ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete review
 *       404:
 *         description: No review with this ID
 *       500:
 *         description: Cannot delete Review
 */
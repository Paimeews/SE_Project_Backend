  const express = require('express');
  const {getCampgrounds,getCampground,createCampground,updateCampground,deleteCampground} = require('../controllers/campgrounds');

  /**
 * @swagger
 * components:
 *   schemas:
 *     Campground:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - picture
 *         - activity
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the campground
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name:
 *           type: string
 *           description: Campground's name
 *         address:
 *           type: string
 *           description: Campground's address
 *         picture:
 *           type: string
 *           description: Campground's picture
 *         tel:
 *           type: string
 *           description: Campground's tel
 *         activity:
 *           type: string
 *           description: Campground's activity
 *         tag:
 *           type: array
 *           description: Campground's tag
 *         avgRate:
 *           type: number
 *           description: Campground's average rate
 *         totalRate:
 *           type: number
 *           description: Campground's total rate
 *       example:
 *         id: 65fd99a7b477d9016553c761
 *         name: Valley of Fire State Park
 *         address: Nevada
 *         picture: https://drive.google.com/uc?id=1TxpR4hIdPCn3PIrqlcPr9ojD6sr3KWFc
 *         tel: 081-363-3282
 *         activity: Biking
 *         tag: [Hill, Mountain Range]
 *         avgRate: 5
 *         totalRate: 2
 */
/**
 * @swagger
 * tags:
 *   name: Campgrounds
 *   description: The campgrounds managing API
 */
/**
 * @swagger
 * /campgrounds:
 *   get:
 *     summary: Returns the list of all campgrounds
 *     tags: [Campgrounds]
 *     responses:
 *       200:
 *         description: The list of all campgrounds was successfully return
 *       400:
 *         description: Cannot return campgrounds
 */
/**
 * @swagger
 * /campgrounds/{cid}:
 *   get:
 *     summary: Returns the campground by the id
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: The campground id
 *     responses:
 *       200:
 *         description: The specific campground was successfully return
 *       400:
 *         description: The campground was not found
 */
/**
 * @swagger
 * /campgrounds:
 *   post:
 *     summary: Create a new campground
 *     tags: [Campgrounds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               picture:
 *                 type: string
 *               tel:
 *                 type: string
 *               activity:
 *                 type: string
 *               tag:
 *                 type: array
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: The campground was successfully created
 */
/**
 * @swagger
 * /campgrounds/{cid}:
 *   put:
 *     summary: Update campground by the id
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: The campground id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               picture:
 *                 type: string
 *               tel:
 *                 type: string
 *               activity:
 *                 type: string
 *               tag:
 *                 type: array
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The campground was successfully updated
 *       400:
 *         description: Cannot update the campground
 */
/**
 * @swagger
 * /campgrounds/{cid}:
 *   delete:
 *     summary: Remove the campground by the id
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: The campground id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The campground was successfully deleted
 *       400:
 *         description: Cannot delete the campground
 */

  const reviewsRouter = require("./reviews")
  const ratesRouter = require("./rates")
  const bookingRouter = require('./bookings');
  const router = express.Router();
  const {protect,authorize} = require('../middleware/auth');

  router.use('/:campgroundId/bookings/',bookingRouter)
  router.use('/:campgroundId/reviews/',reviewsRouter)
  router.use('/:campgroundId/rates/',ratesRouter)

  router.route('/').get(getCampgrounds).post(protect,authorize('admin'),createCampground);
  router.route('/:id').get(getCampground).put(updateCampground).delete(protect,authorize('admin'),deleteCampground);

  


 module.exports=router;
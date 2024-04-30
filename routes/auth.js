const express = require('express');
const {register,login,getMe,logout} = require('../controllers/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the user
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         role:
 *           type: string
 *           description: User's role
 *         password:
 *           type: string
 *           description: User's password
 *         createdAt:
 *           type: date
 *           description: User's created time
 *       example:
 *         id: 65e30741129fdf3008bbb7f8
 *         name: User3
 *         email: user3@gmail.com
 *         role: user
 *         password: 987654321
 *         createdAt: 2024-02-27T15:06:58.699+00:00
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       in: header
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 default: 'user'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       400:
 *         description: Some server error
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log-in to the system
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was successfully log-in
 *       400:
 *         description: Please provide an email and password or user is not registered
 *       401:
 *         description: Email or password is incorrect
 */
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Returns current logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current logged in user was successfully return
 */
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log user out
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user was successfully log-out
 */

const router = express.Router();

const {protect} = require('../middleware/auth');


router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe);
router.get('/logout',logout);


module.exports=router;

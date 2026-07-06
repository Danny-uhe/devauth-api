const express = require('express');
const { identifier } = require('../middleware/identification');
const postsController = require('../controllers/postsController');

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.get('/all-posts', postsController.getPosts);

/**
//  * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
//  */
router.get('/single-posts', postsController.singlePost);

// /**
//  * @swagger
//  * /api/auth/signout:
//  *   post:
//  *     summary: Logout user
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User logged out
//  */
 router.post('/create-posts', identifier, postsController.createPost);

// /**
//  * @swagger
//  * /api/auth/send-verification-code:
//  *   patch:
//  *     summary: Send verification code
//  *     tags: [Verification]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Verification code sent
//  */
 router.put(
   '/update-posts',
   identifier,
   postsController.updatePost,
 );

// /**
//  * @swagger
//  * /api/auth/verify-user:
//  *   patch:
//  *     summary: Verify user account
//  *     tags: [Verification]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               verificationCode:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: User verified successfully
//  */
 router.delete('/delete-posts', identifier, postsController.deletePost);

module.exports = router;

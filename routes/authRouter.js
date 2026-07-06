const express = require('express');
const authController = require('../controllers/authController');
console.log(Object.keys(authController));
const { identifier } = require('../middleware/identification');

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
router.post('/signup', authController.signup);

/**
 * @swagger
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
 */
router.post('/signin', authController.signin);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out
 */
router.post('/signout', identifier, authController.signout);

/**
 * @swagger
 * /api/auth/send-verification-code:
 *   patch:
 *     summary: Send verification code
 *     tags: [Verification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification code sent
 */
router.patch(
  '/send-verification-code',
  identifier,
  authController.sendVerificationCode,
);

/**
 * @swagger
 * /api/auth/verify-user:
 *   patch:
 *     summary: Verify user account
 *     tags: [Verification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 */
router.patch('/verify-user', identifier, authController.verifyUser);


/**
 * @swagger
 * /api/auth/change-password:
 *   patch:
 *     summary: Change user password
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.patch(
  '/change-password',
  identifier,
  authController.changePassword);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   patch:
 *     summary: Send forgot password code
 *     tags: [Forgot Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Forgot password code sent
 */
router.patch('/forgotPassword', authController.sendForgotPasswordCode);
router.patch(
  '/verifyForgotPassword',
  authController.verifyForgotPasswordCode
);


module.exports = router;

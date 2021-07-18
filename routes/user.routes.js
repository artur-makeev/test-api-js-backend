const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userlogin:
 *           type: string
 *         passwprd:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         id: 1
 *         userlogin: testuser
 *         password: asdasdasd
 *         role: ADMIN
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: Users` accouts managing API
  */

 /**
  * @swagger
  * /api/user/registration/:
  *   post:
  *     security:
  *       - bearerAuth: []
  *     summary: Creates a user account
  *     tags: [Users]
  *     responses:
  *       200:
  *         description: account created
  *         content:
  *           application/json:
  *             type: string
  *       401:
  *         description: Not authorized
  *       500:
  *         description: Unhandled error
  */

router.post(
  '/registration',
  auth,
  userController.registration,
);

/**
 * @swagger
 * /api/user/login/:
 *   post:
 *     summary: Signs in account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userlogin:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sign in
 *         content:
 *           application/json:
 *             type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */

router.post(
  '/login',
  userController.login,
);


/**
 * @swagger
 * /api/user/delete/{id}/:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes account with specified id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schemas:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Account deleted
 *         content:
 *           application/json:
 *             type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */


router.delete(
  '/delete/:id',
  auth,
  userController.del,
);

module.exports = router;

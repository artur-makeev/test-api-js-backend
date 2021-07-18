const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth.middleware');
const contactsController = require('../controllers/contacts.controller');


/**
 * @swagger
 * components:
 *  schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         lastname:
 *           type: string
 *         firstname:
 *           type: string
 *         patronymic:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: TIMESTAMP WITH TIME ZONE
 *         updatedAt:
 *           type: TIMESTAMP WITH TIME ZONE
 *         CompanyId:
 *           type: integer
 *       example:
 *         id: 16
 *         lastname: Григорьев
 *         firstname: Сергей
 *         patronymic: Петрович
 *         phone: 79162165588
 *         email: grigoriev@funeral.com
 *         createdAt: 2020-11-21T08:03:26.589Z
 *         updatedAt: 2020-11-21T08:03:26.589Z
 *         CompanyId: 12
 */

 /**
  * @swagger
  * tags:
  *   name: Contacts
  *   description: Contacts` data managing API
  */

/**
 * @swagger
 * /api/contacts/{id}/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retuns information about contact of the company with specified id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schemas:
 *           type: string
 *         required: true
 *         description: The company id which contactes are searched
 *     responses:
 *       200:
 *         description: contact information
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */


router.get(
  '/:CompanyId',
  auth,
  contactsController.get,
);


/**
 * @swagger
 * /api/contacts/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Adds a contact to the Contacts table
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: contact added
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */



router.post(
  '/',
  auth,
  contactsController.create,
)

/**
 * @swagger
 * /api/contacts/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Updates information about contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schemas:
 *           type: string
 *         required: true
 *         description: The contact id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: contact updated
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */

router.patch(
  '/:id',
  auth,
  contactsController.update,
);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes information about contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schemas:
 *           type: string
 *         required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: contact deleted
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */

router.delete(
  '/:id',
  auth,
  contactsController.del,
);

module.exports = router;

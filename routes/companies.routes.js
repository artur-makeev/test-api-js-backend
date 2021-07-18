const express = require('express');
const multer = require('multer');
const config = require('../config');

const fileHandler = multer({ dest: config.uploads_dir });
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const companiesController = require('../controllers/companies.controller');

const filesParamsValidator = require('../middleware/validators/files.params.validator');
const filesController = require('../controllers/files.controller');


/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         shortName:
 *           type: string
 *         businessEntity:
 *           type: string
 *         contract:
 *           type: JSONB
 *         type:
 *           type: string
 *         status:
 *           type: string
 *         address:
 *           type: string
 *         createdAt:
 *           type: TIMESTAMP WITH TIME ZONE
 *         updatedAt:
 *           type: TIMESTAMP WITH TIME ZONE
 *       example:
 *         id: 12
 *         name: ОО Фирма «Перспективные захоронения»
 *         shortName: Перспективные захоронения
 *         businessEntity: ООО
 *         contract: {id: '12345', issue_date: '2015-03-12T00:00:00Z'}
 *         type: agent
 *         status: active
 *         address: Moscow
 *         createdAt: 2020-11-21T08:03:00Z
 *         updatedAt: 2020-11-23T09:30:00Z
 */




 /**
  * @swagger
  * tags:
  *   name: Companies
  *   description: Companies` data managing API
  */

 /**
  * @swagger
  * /api/companies:
  *   get:
  *     security:
  *       - bearerAuth: []
  *     summary: Retuns list of comoanies
  *     tags: [Companies]
  *     parameters:
  *       - in: query
  *         name: type
  *         schemas:
  *           type: string
  *         description: Type of companies (It can take value 'agent' or 'contractor')
  *       - in: query
  *         name: status
  *         schemas:
  *           type: string
  *         description: Status of companies
  *       - in: query
  *         name: limit
  *         schemas:
  *           type: integer
  *         description: Maximum number of comapnies displayed on a single page
  *       - in: query
  *         name: page
  *         schemas:
  *           type: integer
  *         description: Page number
  *       - in: query
  *         name: sort
  *         schemas:
  *           type: string
  *         description: Sort by name (value='name'), by date (value='date'), by name and date (value='nameanddate')
  *     responses:
  *       200:
  *         description: List of companies
  *         content:
  *           application/json:
  *             type: json
  *             items:
  *               $ref: '#/components/schemas/Company'
  *       401:
  *         description: Not authorized
  *       500:
  *         description: Unhandled error
  */

router.get(
  '/',
  auth,
  companiesController.getAll,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retuns information about company with specified id
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schemas:
 *           type: string
 *         required: true
 *         description: The company id
 *     responses:
 *       200:
 *         description: Company`s information
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Company'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: The company was not found
 *       500:
 *         description: Unhandled error
 */

router.get(
  '/:id',
  auth,
  companiesController.getOne,
);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Adds company information to the Companies database
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company information
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Company'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */

router.post(
  '/',
  auth,
  companiesController.create,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Updates information about company by id
 *     tags: [Companies]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     parameters:
 *       - in: path
 *         name: id
 *         schemas:
 *           type: string
 *         required: true
 *         description: The company id
 *     responses:
 *       200:
 *         description: list of companies
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Company'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: The company was not found
 *       500:
 *         description: Unhandled error
 */

router.patch(
  '/:id',
  auth,
  companiesController.update,
);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes information about company with specified id
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schemas:
 *           type: string
 *         required: true
 *         description: The company id
 *     responses:
 *       200:
 *         description: list of companies
 *         content:
 *           application/json:
 *             type: json
 *             items:
 *               $ref: '#/components/schemas/Company'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Unhandled error
 */

router.delete(
  '/:id',
  auth,
  companiesController.del,
);

// router.post(
//   '/:id/image',
//   auth,
//   fileHandler.fields([{ name: 'file', maxCount: 1 }]),
//   filesParamsValidator.addCompanyImage,
//   filesController.saveImage,
// );
//
// router.delete(
//   '/:id/image/:image_name',
//   auth,
//   filesParamsValidator.removeCompanyImage,
//   filesController.removeImage,
// );

module.exports = router;

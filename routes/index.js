
const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const companiesRouter = require('./companies.routes');
const contactsRouter = require('./contacts.routes');

router.use('/companies', companiesRouter);
router.use('/contacts', contactsRouter);
router.use('/user', userRouter);



module.exports = router;

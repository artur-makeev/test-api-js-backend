const config = require('../config');
const {Contact} = require('../models/models');
const {Company} = require('../models/models');
const logger = require('../services/logger')(module);

module.exports = {
  create,
  get,
  update,
  del
};

async function create(req, res, next) {
  try {
    const {
      lastname,
      firstname,
      patronymic,
      phone,
      email,
      createdAt,
      updatedAt,
      CompanyId
    } = req.body;
    const id = req.body.CompanyId;
    const company = await Company.findOne({where: {id}});
    if (!company) {
      return res.status(404).json({message: `Company with id ${id} doesn\`t exist`});
    }
    const contact = await Contact.create({
      lastname,
      firstname,
      patronymic,
      phone,
      email,
      createdAt,
      updatedAt,
      CompanyId
    });
    return res.json(contact);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error});
  }

};


async function get(req, res) {
  try {
    const {CompanyId} = req.params;
    const contact = await Contact.findAll({where:{CompanyId}});
    return res.json(contact);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error});
  }
};


async function update(req, res) {
  try {
    const {id} = req.params;
    const {
      lastname,
      firstname,
      patronymic,
      phone,
      email,
      CompanyId
    } = req.body;

    const contact = await Contact.findOne({where:{id}});

    contact.lastname = lastname
    contact.firstname = firstname
    contact.patronymic = patronymic
    contact.phone = phone
    contact.email = email
    contact.CompanyId = CompanyId

    await contact.save();
    return res.status(200).json(contact);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error});
  }
};


async function del(req, res, next) {
  try {
      const {id} = req.params;
    const contact = await Contact.findOne({where: {id}});
    if (!contact) {
      return res.status(404).json({message: `Contact with id ${id} doesn\`t exist`});
    };
    await Contact.destroy({where:{id}});
    return res.json({message: "Contact deleted"})
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error});
  }
};

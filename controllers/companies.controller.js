const config = require('../config');
const {Company} = require('../models/models');
const logger = require('../services/logger')(module);

module.exports = {
  create,
  getOne,
  getAll,
  update,
  del,
};


async function getOne(req, res) {
  try {
    const {id} = req.params;
    const company = await Company.findAll({where: {id}});
    if (company == []) {
      return res.status(404).json({message: `Company with id ${id} doesn\`t exist`})
    }
    return res.status(200).json(company);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }
};

async function getAll(req, res) {
  // const URL = _getCurrentURL(req); // http://localhost:2114/
  // company.photos = [{
  //   name: '0b8fc462dcabf7610a91.png',
  //   filepath: `${URL}0b8fc462dcabf7610a91.png`,
  //   thumbpath: `${URL}0b8fc462dcabf7610a91_160x160.png`,
  // }];
  // return res.status(200).json(company);
  try {
    let {type, status, limit, page, sort} = req.query
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let companies;
    if (!type && !status) {
      if (sort==="name") {
        companies = await Company.findAndCountAll({
          order: [['name', 'ASC']],
          limit,
          offset
        });
      } else if (sort==="date") {
        companies = await Company.findAndCountAll({
          order: [['createdAt', 'DESC']],
          limit,
          offset
        });
      } else if (sort==="nameanddate") {
        companies = await Company.findAndCountAll({
          order: [['name', 'ASC'],['createdAt', 'DESC']],
          limit,
          offset
        });
      } else {
        companies = await Company.findAndCountAll({limit, offset});
      }
    };
    if (type && !status) {
      if (sort==="name") {
        companies = await Company.findAndCountAll({
          where: {type},
          order: [['name', 'ASC']],
          limit,
          offset});
      } else if (sort==="date") {
        companies = await Company.findAndCountAll({
          where: {type},
          order: [['createdAt', 'DESC']],
          limit,
          offset});
      } else if (sort==="nameanddate") {
        companies = await Company.findAndCountAll({
          where: {type},
          order: [['name', 'ASC'], ['createdAt', 'DESC']],
          limit,
          offset});
      } else {
      companies = await Company.findAndCountAll({where: {type}, limit, offset});
      };
    };
    if (!type && status) {
      if (sort==="name") {
        companies = await Company.findAndCountAll({
          where: {status},
          order: [['name', 'ASC']],
          limit,
          offset});
      } else if (sort==="date") {
        companies = await Company.findAndCountAll({
          where: {status},
          order: [['createdAt', 'DESC']],
          limit,
          offset});
      } else if (sort==="nameanddate") {
        companies = await Company.findAndCountAll({
          where: {status},
          order: [['name', 'ASC'], ['createdAt', 'DESC']],
          limit,
          offset});
      } else {
        companies = await Company.findAndCountAll({where: {status}, limit, offset});
      }

    };
    if (type && status) {
      if (sort==="name") {
        companies = await Company.findAndCountAll({
          where: {type, status},
          order: [['name', 'ASC']],
          limit,
          offset
        });
      } else if (sort==="date") {
        companies = await Company.findAndCountAll({
          where: {type, status},
          order: [['createdAt', 'DESC']],
          limit,
          offset
        });
      } else if (sort==="nameanddate") {
        companies = await Company.findAndCountAll({
          where: {type, status},
          order: [['name', 'ASC'], ['createdAt', 'DESC']],
          limit,
          offset
        });
      } else {
        companies = await Company.findAndCountAll({
          where: {type, status},
          limit,
          offset
        });
      }

    };
    return res.status(200).json(companies);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }

}

async function create(req, res) {
  try {
    const {
      name,
      shortName,
      businessEntity,
      contract,
      type,
      status,
      createdAt,
      updatedAt,
      address
    } = req.body;
    const company = await Company.create({
      name,
      shortName,
      businessEntity,
      contract,
      type,
      status,
      createdAt,
      updatedAt,
      address
    });
    return res.json(company);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }

};

async function update(req, res) {
  try {
    const {
      name,
      shortName,
      businessEntity,
      contract,
      type,
      status,
      address
    } = req.body;

    const {id} = req.params;

    const company = await Company.findOne({where: {id}});
    if (!company) {
      return res.status(404).json({message: `Company with id ${id} doesn\`t exist`});
    };
    company.name = name;
    company.shortName = shortName;
    company.businessEntity = businessEntity;
    company.contract = contract;
    company.type = type;
    company.status = status;
    company.address = address;

    await company.save();
    return res.status(200).json(company);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }
}


  // const requestBody = req.body;
  //
  // const URL = _getCurrentURL(req);
  // company.photos = [{
  //   name: '0b8fc462dcabf7610a91.png',
  //   filepath: `${URL}0b8fc462dcabf7610a91.png`,
  //   thumbpath: `${URL}0b8fc462dcabf7610a91_160x160.png`,
  // }];
  //
  // const updatedCompany = {
  //   ...company
  // };
  // Object.keys(requestBody).forEach((key) => {
  //   updatedCompany[key] = requestBody[key];
  // });
  // updatedCompany.updatedAt = new Date();
  //
  // return res.status(200).json(updatedCompany);


async function del(req, res) {

try {
  const {id} = req.params;

  const company = await Company.findOne({where: {id}});
  if (!company) {
    return res.status(404).json({message: `Company with id ${id} doesn\`t exist`});
  };
  await Company.destroy({where:{id}});
  return res.json({message: "Company deleted"});
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }
}

// function _getCurrentURL(req) {
//   const {
//     port
//   } = config;
//   return `${req.protocol}://${req.hostname}${port === '80' || port === '443' ? '' : `:${port}`}/`;
// }

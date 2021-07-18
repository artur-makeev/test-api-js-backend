const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/models');
const config = require('../config');
const logger = require('../services/logger')(module);



module.exports = {
  registration,
  login,
  del
}

const generateJwt = (id, userlogin, role) => {
  return jwt.sign(
    {id, userlogin, role},
    config.SECRET_KEY,
    {expiresIn: config.jwt_ttl}
  );
};

async function registration(req, res, next) {
  try {
    const {userlogin, password, role} = req.body;
    if (!userlogin || !password) {
      return res.status(404).json({message: 'No user or password'});
    };
    const canditate = await User.findOne({where: {userlogin}});
    if (canditate) {
      return res.status(404).json({message: 'User with such login already exists'});
    };
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({userlogin, role, password: hashPassword});
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({token});
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }
};

async function login(req, res, next) {
  try {
    const {userlogin, password} = req.body;
    const user = await User.findOne({where: {userlogin}});
    if (!user) {
      return res.status(404).json({message: 'User with such login doesn`t exist'});
    };
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(404).json({message: 'Wrong password'});
    };
    const token = generateJwt(user.id, user.userlogin, user.role);
    return res.json({token});
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }
};



async function del(req, res, next) {
  const {id} = req.params;
  try {
    const user = await User.findOne({where: {id}});
    if (!user) {
      return res.status(404).json({message: `User with id ${id} doesn\`t exist`});
    };
    await User.destroy({where:{id}});
    return res.status(200).json({message: "User deleted"})
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }

};



  //
  // const token = jwt.sign(
  //   { user },
  //   config.app,
  //   {
  //     expiresIn: config.jwt_ttl,
  //   },
  // );
  //
  // res.header('Authorization', `Bearer ${token}`);
  // return res.status(200).end();

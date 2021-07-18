const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userlogin: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Company = sequelize.define('Company', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  shortName: {type: DataTypes.STRING},
  businessEntity: {type: DataTypes.STRING},
  contract: {type: DataTypes.JSONB},
  type: {type: DataTypes.STRING},
  status: {type: DataTypes.STRING}, //['agent', 'contractor']12
  address: {type: DataTypes.STRING},
  // createdAt: {type: DataTypes.DATE},
  // updatedAt: {type: DataTypes.DATE}
});

const Contact = sequelize.define('Contact', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  lastname: {type: DataTypes.STRING},
  firstname: {type: DataTypes.STRING},
  patronymic: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  // createdAt: {type: DataTypes.DATE},
  // updatedAt: {type: DataTypes.DATE}
});

Company.hasMany(Contact);
Contact.belongsTo(Company);

module.exports = {
  User,
  Company,
  Contact,

};

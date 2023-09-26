const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

/*
** DB Connetion
*/

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*
** DB model declaration
*/

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.menu = require("../models/menu.model.js")(sequelize, Sequelize);
db.rolemenu = require("../models/roleMenu.model.js")(sequelize, Sequelize);

module.exports = db;
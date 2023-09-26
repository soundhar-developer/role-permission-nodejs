module.exports = (sequelize, Sequelize) => {
  const Menu = sequelize.define("menus", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Menu;
};
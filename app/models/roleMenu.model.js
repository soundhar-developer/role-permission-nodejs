module.exports = (sequelize, Sequelize) => {
  const RoleMenu = sequelize.define("role_menus", {
    role_id: {
      type: Sequelize.STRING
    },
    menu: {
      type: Sequelize.STRING
    }
  });

  return RoleMenu;
};
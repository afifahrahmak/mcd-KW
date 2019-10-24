'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Menu extends Model { }

  Menu.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    urlImage: DataTypes.STRING
  }, { sequelize });
  Menu.associate = function (models) {
    Menu.belongsToMany(models.Customer, { through: models.Order })
  };
  return Menu;
};
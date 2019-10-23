'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Customer extends Model { }

  Customer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, { sequelize });

  Customer.associate = function (models) {
    Customer.belongsToMany(models.Menu, { trough: models.Order })
  };

  return Customer;
};
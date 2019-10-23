'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Order extends Model {

  }

  Order.init({
    CustomerId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, { sequelize });
  Order.associate = function (models) {
    // associations can be defined here
  };
  return Order;
};
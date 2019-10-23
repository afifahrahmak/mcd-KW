'use strict';
module.exports = (sequelize, DataTypes) => {

  const ClassModel = sequelize.models
  const Model = sequelize.Sequelize.Model

  class Order extends Model {

    get totalPrice() {

      return ClassModel.Menu
        .findByPk(this.MenuId)
        .then(menu => {
          this.totalPrice = this.quantity * menu.price
          return this.totalPrice
        })
    }

    static checkout(id, username) {
      return Order.findAll({ where: { CustomerId: id }, include: ClassModel.Menu })
        .then(orders => {
          orders.map(order => {

          })
          let receipt = {
            CustomerName: username,
            orders: [],
            totalPayment: 
          }
        })
    }

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

// let checkout = {
//   CustomerId: DataTypes.INTEGER,
//    orderId: DataTypes.INTEGER,
//   CustomerName: DataTypes.STRING,
//   MenuName: DataTypes.STRING
//   totalPayment: 
// }
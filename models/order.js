'use strict';
module.exports = (sequelize, DataTypes) => {

  const ClassModel = sequelize.models
  const Model = sequelize.Sequelize.Model
  const Menu = sequelize.models.Menu

  class Order extends Model {

    get totalPrice() {

      return ClassModel.Menu
        .findByPk(this.MenuId)
        .then(menu => {
          this.totalPrice = this.quantity * menu.price
          return this.totalPrice
        })
    }

    // static checkout(id, username) {
    //   return Order.findAll({ where: { CustomerId: id }, include: ClassModel.Menu })
    //     .then(orders => {
    //       orders.map(order => {
            
    //       })
    //       // let receipt = {
    //       //   CustomerName: username,
    //       //   orders: [],
    //       //   totalPayment: 
    //       // }
    //     })
    // }

  }

  Order.init({
    id : {
      type : DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    CustomerId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, { 
    hooks : {
      afterUpdate: (order,options) => {
        Menu.findByPk(order.MenuId)
          .then(menu =>{
            let newTotal = menu.price * order.quantity
            order.totalPrice = newTotal
          })
      }
    },
    sequelize
   });
  Order.associate = function (models) {
    Order.belongsTo(models.Customer)
    Order.belongsTo(models.Menu)
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
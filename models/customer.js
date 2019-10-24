'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const bcrypt = require('../helpers/bcrypt')
  class Customer extends Model {

    topUp(money) {
      if (money >= 1000000) {
        throw new Error('Maximum top up is Rp.1,000,000')
      }
      else if (money <= 10000) {
        throw new Error('Minimum top up is Rp.10,000')
      }
      else {
        this.balance += money
        return this.balance
      }
    }


  }

  Customer.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid Email'
        },
        isUnique(value,next){
          return Customer.findOne({
            where : {
              email : value
            }
          })
            .then(customer =>{
              if(!customer){
                next()
              }else if(customer && customer.id === this.id){
                next()
              }else{
                next(new Error('Email already exists'))
              }
            })
        }
      }
    },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(Customer, options) {
        if(!Customer.dataValues.balance){
          Customer.dataValues.balance = 0
        }
        let hashedPass = bcrypt(Customer.password,8)
        Customer.password = hashedPass
      }
    }
  });

  Customer.associate = function (models) {
    Customer.belongsToMany(models.Menu, { through: models.Order })
  };

  return Customer;
};
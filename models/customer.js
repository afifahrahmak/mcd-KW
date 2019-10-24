'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
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
      validate: {
        allowNull: false,
        isEmail: {
          args: true,
          msg: 'invalid Email'
        },
        unique: {
          args: true,
          msg: 'email already registered'
        },
      }
    },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(Customer, options) {
        const secret = String(Math.random() * 1000)
        let pass = this.password
        const password = hashPassword(pass, secret)

        Customer.setDataValue('password', password)
        Customer.setDataValue('salt', secret)
      }
    }
  });

  Customer.associate = function (models) {
    Customer.belongsToMany(models.Menu, { through: models.Order })
  };

  return Customer;
};
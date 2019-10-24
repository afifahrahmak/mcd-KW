const { Menu, Order, Customer, Checkout } = require('../models');
// const nodeMailer = require('../helpers/nodeMailer');

class OrderController {

  static allMenuPage(req, res) {
    Menu.findAll()
      .then(menu => {
        res.render('pages/orders/order', { menu });
      })
      .catch(err => {
        res.send(err.message);
      })
  }

  // static createOrder(req,res){
  //   Order.create({
  //     CustomerId : 
  //   })
  // }
}

module.exports = OrderController;
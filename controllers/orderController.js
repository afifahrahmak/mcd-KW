const { Menu, Order, Customer } = require('../models');
const numberFormat = require('../helpers/numberFormat');
const Mailer = require('../helpers/nodeMailer')

class OrderController {

  static allMenuPage(req, res) {
    Order.findAll({
      where : {
        CustomerId : req.params.id
      },
      include : [Menu,Customer]
    })
      .then(orders =>{
        if(orders.length){
          res.render('checkout',{orders,numberFormat})
        }else{
          res.redirect('/')
        }
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static checkout(req,res){
    let priceTotal = 0
    let Id = req.params.id
    Order.findAll({
      where : {
        CustomerId : Id
      },
      include : [Customer]
    })
      .then(orders =>{
        orders.forEach(order =>{
          priceTotal += order.totalPrice
        })
        Mailer(priceTotal,'imanuelnjodi@gmail.com',orders[0].Customer.name)
        return Order.destroy({
          where : {
            CustomerId : Id
          }
        })
      })
      .then(data =>{
        res.redirect('/')
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static editForm(req,res){
    Order.findByPk(req.params.Id)
      .then(order =>{
        res.render('editForm',{order})
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static editOrder(req,res){
    Order.update({
      quantity : Number(req.body.quantity)
    },{
      where : {
        id : req.params.Id
      },
      individualHooks : true
    })
      .then(()=>{
        res.redirect(`/order/${req.params.custId}`)
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static deleteOrder(req,res){
    Order.destroy({
      where : {
        id : req.params.id
      }
    })
      .then(()=>{
        res.redirect(`/order/${req.params.custId}`)
      })
      .catch(err =>{
        res.send(err)
      })
  }
}

module.exports = OrderController;
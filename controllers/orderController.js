const { Menu, Order, Customer } = require('../models');
const numberFormat = require('../helpers/numberFormat');
const Mailer = require('../helpers/nodeMailer')

class OrderController {

  static allMenuPage(req, res) {
    let priceTotal = 0
    Order.findAll({
      where : {
        CustomerId : req.params.id
      },
      include : [Menu,Customer]
    })
      .then(orders =>{
        if(orders.length){
          orders.forEach(order =>{
            priceTotal += order.totalPrice
          })
          res.render('checkout',{orders,priceTotal,numberFormat})
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
    let id = req.params.id
    Order.findAll({
      where : {
        CustomerId : id
      },
      include : [Menu,Customer]
    })
      .then(orders =>{
        orders.forEach(order =>{
          priceTotal += order.totalPrice
        })
        Mailer(priceTotal)
        return Order.destroy({
          where : {
            CustomerId : id
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
      quantity : req.body.quantity
    },{
      where : {
        id : req.params.Id
      }
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
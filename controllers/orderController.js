const { Menu, Order, Customer } = require('../models');
const nodeMailer = require('../helpers/nodeMailer');
const numberFormat = require('../helpers/numberFormat')
const hbs = require('express-handlebars')

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
        console.log(orders)
        const mailOptions = {
          from: 'newljodi@gmail.com', // sender address
          to: 'imanuelnjodi@gmail.com', // list of receivers
          subject: 'Invoice', // Subject line
          html: `<h1 style="font-style : italic;"> Halo, ${orders[0].Customer.username} </h1>
                <p>${priceTotal}</p>
                ${'\u{1F601}'}
                `// plain text body
        };
        nodeMailer.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
        });
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
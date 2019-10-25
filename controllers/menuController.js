const { Menu, Order, Customer } = require('../models');
const numberFormat = require('../helpers/numberFormat')


class MenuController {

  static showMenu(req, res) {
    // const user = req.session.user
    console.log('masuk')
    let limit = 4
    let page = req.query.page || 1
    let offset = (page - 1) * limit
    let type = req.params.type
    Menu.findAndCountAll({
      where: {
        type: req.params.type
      },
      order: [["id", "ASC"]],
      offset: offset,
      limit: limit
      // distinct: true
    })
      .then(menuData => {
        let user = req.session.user
        let rows = menuData.rows
        rows.forEach(element => {
          // console.log('============', element.dataValues)
        });
        // res.send(menuData)
        // let menus = menuData.rows

        let test = Math.round(menuData.count / limit)
        let pageStart = Number(page)
        let lastPage = limit + pageStart
        res.render('menu', { rows, pageStart, lastPage, test, type, numberFormat, user })
        // res.render('',{menus,pageStart,lastPage,test})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static buyMenu(req, res) {
    let type = req.params.type
    let id = req.params.id
    Menu.findByPk(id)
      .then(menu => {
        // res.send(menu)
        res.render('buy', { menu, type, id })
      })
  }

  static orderMenu(req, res) {
    let menuId = req.params.id
    let customerId = req.session.user.id
    let qty = req.body.quantity
    let menuData = null
    let customerData = null
    Menu.findOne({
      where: {
        id: menuId
      }
    })
      .then(menu => {
        menuData = menu
        return Customer.findByPk(customerId)
      })
      .then(customer => {
        // customerData = customer
        let totalPrice = qty * menuData.price
        if (customer.balance >= totalPrice) {
          return Order.create({
            CustomerId: customerId,
            MenuId: menuId,
            quantity: qty,
            totalPrice: totalPrice
          })
        }
        res.redirect(`/topUp/${customerId}?err=Balance%20tidak%20mencukupi`)
      })
      .then(order => {
        res.redirect(`/menu/${req.params.type}`)
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = MenuController;
const { Menu, Order } = require('../models');
const numberFormat = require('../helpers/numberFormat')


class MenuController {

  static showMenu(req, res) {
    const user = req.session.user
    console.log('masuk')
    let limit = 6
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
        // console.log(menuData.rows, '===========================')

        let rows = menuData.rows
        rows.forEach(element => {
          // console.log('============', element.dataValues)
        });
        // res.send(menuData)
        // let menus = menuData.rows

        let test = Math.round(menuData.count / limit)
        let pageStart = Number(page)
        let lastPage = limit + pageStart
        res.locals.user = user
        // res.session.user = user
        res.render('menu', { rows, pageStart, lastPage, test, type, numberFormat })

        // res.render('',{menus,pageStart,lastPage,test})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static orderMenu(req, res) {
    let menuId = req.params.id
    let customerId = req.session.user.id
    let qty = req.body.quantity
    Menu.findOne({
      where: {
        id: menuId
      }
    })
      .then(menu => {
        let totalPrice = qty * menu.price
        return Order.create({
          CustomerId: customerId,
          MenuId: menuId,
          quantity: qty,
          totalPrice: totalPrice
        })
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
const { Menu } = require('../models');
const numberFormat = require('../helpers/numberFormat')

class MenuController {

  static showMenu(req,res){
    let limit = 4
    let page = req.query.page || 1
    let offset = (page-1) * limit
    let type = req.params.type
    Menu.findAndCountAll({
        where : {
            type : type
        },
        order : [["id","ASC"]],
        offset : offset,
        limit : limit
        // distinct : true
    })
        .then(menuData =>{
            let rows = menuData.rows
            // res.send(menuData)
            // let menus = menuData.rows
            let test = Math.round(menuData.count/limit)
            let pageStart = Number(page)
            let lastPage = limit + pageStart
            res.render('menu',{rows,pageStart,lastPage,test,type,numberFormat})
            // res.render('',{menus,pageStart,lastPage,test})
        })
        .catch(err =>{
            res.send(err)
        })
  }

  static orderMenu(req,res){
    let menuId = req.params.id
    let customerId = req.session.id
    let qty = req.body.quantity
    Menu.findOne({
        where : {
            id : id
        }
    })
        .then(menu =>{
            let totalPrice = qty * menu.price
            return Order.create({
                CustomerId : customerId,
                MenuId : menuId,
                quantity : qty,
                totalPrice : totalPrice
            })
        })
        .then(order =>{
            res.redirect(`/`)
        })
        .catch(err =>{
            res.send(err)
        })
  }


}

module.exports = MenuController;
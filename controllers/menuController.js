const { Menu } = require('../models');

class MenuController {

  static showMenu(req,res){
    let limit = 4
    let page = req.query.page || 1
    let offset = (page-1) * limit
    Menu.findAndCountAll({
        where : {
            type : req.params.type
        },
        order : [["id","ASC"]],
        offset : offset,
        limit : limit
        // distinct : true
    })
        .then(menuData =>{
            let menus = menuData.rows
            let test = Math.round(menuData.count/limit)
            let pageStart = Number(page)
            let lastPage = limit + pageStart
            res.render('',{menus,pageStart,lastPage,test})
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

  static create(req, res) {
    console.log(req.body);

    Menu.findOrCreate({
      where: {
        name: req.body.menu_name,
        price: req.body.price
      }
    })
      .then(() => {
        res.redirect('/menu')
      })
      .catch(err => {
        let url = ''
        err.errors.forEach((error, index) => {
          url += `err${index}=${error.message}&`
        })
        res.redirect(`/menu/menus/add?${url}`)
      })
  }

  static editPage(req, res) {
    Menu.findByPk(req.params.id)
      .then(selectedMenu => {
        res.render('pages/menu/editMenu', { selectedMenu })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static update(req, res) {
    console.log(req.body, "=================");
    Menu.update({

      name: req.body.menu_name,
      price: req.body.price
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.redirect('/menu')
      })
      .catch(err => {
        res.render('error')
      })
  }

  static delete(req, res) {
    Menu.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.redirect('/menu')
      })
      .catch(err => {
        res.render('error')
      })
  }


}

module.exports = MenuController;
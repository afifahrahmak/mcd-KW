const { Menu } = require('../models');

class MenuController {

  static allMenu(req, res) {
    Menu.findAll({ order: [["id", "DESC"]] /* [['name', 'DESC']]*/ })
      .then(allMenus => {

        // res.send(allMenus)
        res.render('pages/menu/menu', { allMenus })

      })
      .catch(err => {
        res.send(err);
      })
  }


}

module.exports = MenuController;
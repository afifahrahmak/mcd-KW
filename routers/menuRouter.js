const routes = require('express').Router();
const MenuController = require('../controllers/menuController');

//HOME
// routes.get('/', MenuController.allMenu)
routes.get('/:type',MenuController.showMenu)



module.exports = routes;
const router = require('express').Router();
const MenuController = require('../controllers/menuController');


router.get('/:type',MenuController.showMenu)

module.exports = router;
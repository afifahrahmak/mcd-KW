const router = require('express').Router();
const MenuController = require('../controllers/menuController');


router.get('/:type', MenuController.showMenu)
// router.get('/', (req, res) => {
//     console.log('masuk')
// })

module.exports = router;
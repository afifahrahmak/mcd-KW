const router = require('express').Router();
const OrderController = require('../controllers/orderController');
const CustomerController = require('../controllers/customerController')
const MenuController = require('../controllers/menuController')

const loginMiddleware = (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('/')
    }
}
router.use(loginMiddleware)

router.post('/:type/:id',MenuController.orderMenu)


module.exports = router;
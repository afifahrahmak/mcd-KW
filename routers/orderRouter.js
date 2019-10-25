const router = require('express').Router();
const OrderController = require('../controllers/orderController');
const CustomerController = require('../controllers/customerController')
const MenuController = require('../controllers/menuController')

const loginMiddleware = (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('/login')
    }
}
router.use(loginMiddleware)

router.get('/:type/:id', MenuController.buyMenu)

router.post('/:type/:id', MenuController.orderMenu)

router.get('/:id', OrderController.allMenuPage)

router.post('/:id', OrderController.checkout)

router.get('/edit/:Id/:custId', OrderController.editForm)

router.post('/edit/:Id/:custId', OrderController.editOrder)

router.get('/delete/:id/:custId', OrderController.deleteOrder)

module.exports = router;
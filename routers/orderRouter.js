const router = require('express').Router();
const OrderController = require('../controllers/orderController');

const loginMiddleware = (req, res, next) => {
    if (req.session) {
        next()
    }
    else {
        res.redirect('/')
    }
}
router.use(loginMiddleware)

router.get('/receipt/edit', OrderController.editPage);
router.post('/receipt/edit', OrderController.edit);
router.get('/receipt/delete', OrderController.delete);

router.get('/receipt/:id', OrderController.receiptPage); // id = CustomerId

router.post('/checkout', OrderController.checkout);

router.get('/purchased', OrderController.purchased)




module.exports = router;
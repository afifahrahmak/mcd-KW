const router = require('express').Router();
const OrderController = require('../controllers/orderController');


// router.post('/:food/:id',OrderController.createOrder)

// const loginMiddleware = (req, res, next) => {
//     if (req.session.customer) {
//         next()
//     }
//     else {
//         res.redirect('/login')
//     }
// }

// router.use(loginMiddleware)


// router.get('/receipt/edit', OrderController.editPage);
// router.post('/receipt/edit', OrderController.edit);
// router.get('/receipt/delete', OrderController.delete);

// router.get('/receipt/:id', OrderController.receiptPage); // id = CustomerId

// router.post('/checkout', OrderController.checkout);

// router.get('/purchased', OrderController.purchased)




module.exports = router;
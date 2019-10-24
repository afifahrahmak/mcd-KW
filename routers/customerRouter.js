const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/', (req, res) => {
    let user = req.session.user
    res.render('main',{user})
})

const loginMiddleware = (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('/')
    }
}

router.get('/login',CustomerController.loginForm)

router.post('/login',CustomerController.login)

router.get('/register',CustomerController.registerForm)

router.post('/register',CustomerController.register)

router.get('/logout',loginMiddleware,(req,res)=>{
    req.session.destroy(()=>{res.redirect('/')})
})

router.get('/topUp/:id',loginMiddleware,CustomerController.topup)

router.post('/topUp/:id',loginMiddleware,CustomerController.updateBalance)

module.exports = router
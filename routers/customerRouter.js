const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/', (req, res) => {
    let user = req.session.user
    let err = req.query.err
    res.render('main', { user,err })
})

router.get('/login', CustomerController.loginForm) // kalau ngeklik tombol login, pindah page //kelar
const loginMiddleware = (req, res, next) => { // mas backend
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('/')
    }
}

router.get('/login', CustomerController.loginForm)

router.post('/login', CustomerController.login) // ini ketika login, balikan nya apa? 

router.get('/register', CustomerController.registerForm) //

router.post('/register', CustomerController.register)//


router.get('/logout', loginMiddleware, (req, res) => { // mas backend
    req.session.destroy(() => { res.redirect('/') })
})

router.get('/topUp/:id', loginMiddleware, CustomerController.topup)

router.post('/topUp/:id', loginMiddleware, CustomerController.updateBalance)

module.exports = router
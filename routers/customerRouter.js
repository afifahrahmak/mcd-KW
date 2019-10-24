const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/', (req, res) => {
    res.render('main')
})

router.get('/login',CustomerController.loginForm)

router.post('/login',CustomerController.login)

router.get('/register',CustomerController.registerForm)

router.post('/register',CustomerController.register)

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{res.redirect('/')})
})

module.exports = router
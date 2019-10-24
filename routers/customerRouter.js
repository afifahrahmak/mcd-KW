const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/', (req, res) => {
    let user = req.session.user
    res.render('main',{user})
})

router.get('/login',CustomerController.loginForm)

router.post('/login',CustomerController.login)

router.get('/register',CustomerController.registerForm)

router.post('/register',CustomerController.register)

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{res.redirect('/')})
})

module.exports = router
const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

const Login = (req, res, next) => {
    if (req.session.Customer) next()
    else res.redirect('/?err=' + 'please login first')
}

router.get('/signUp', (req, res) => {
    res.render('signUpForm')
})
router.post('/signUp', CustomerController.register)


router.get('/signIn', (req, res) => {
    res.render('signInForm')
})
router.post('/SignIn', CustomerController.login)


router.get('/logout', CustomerController.logout)

module.exports = router
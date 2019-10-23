const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')


router.get('/',(req,res)=>{
    res.render('main')
})

module.exports = router
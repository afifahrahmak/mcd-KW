const Customer = require('../models').Customer
const Order = require('../models').Order
const bcrypt = require('bcrypt')
const session = require('express-session')
const numberFormat = require('../helpers/numberFormat')


class CustomerController {

    static registerForm(req, res) {
        let err = req.query.err || undefined
        let city = [
            "Jakarta Selatan"
        ]
        let kecamatan = [
            "Cilandak",
            "Jagakarsa",
            "Kebayoran Baru",
            "Kebayoran Lama",
            "Mampang prapatan",
            "Pancoran",
            "Pasar Minggu",
            "Pesanggrahan",
            "Setiabudi",
            "Tebet"
        ]
        res.render('register', { city, kecamatan, err })
    }

    static register(req, res) {
        let address = `${req.body.city},${req.body.kecamatan},${req.body.address}`
        Customer.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: address
        })
            .then(value => {
                req.session.user = {
                    name : req.body.username,
                    email : req.body.email,
                    password : req.body.password
                }
                res.redirect('/')
                // if (value[1]) {
                //     res.redirect('/')
                // } else {
                //     res.render('register', { err: err.message.split(':')[1] })
                // }
            })
            .catch(err => {
                res.redirect('/register?err=Email%20already%20exists')
                // res.status(500).send('sorry server is under alien attack')
            })
    }

    static loginForm(req, res) {
        res.render('login', { err: null })
    }

    static login(req, res) {
        Customer.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(userFound => {
                bcrypt.compare(req.body.password, userFound.password, function (err, success) {
                    if (err) {
                        throw err
                    } else {
                        if (success) {
                            res.redirect('/')
                        } else {
                            res.render('login', { err: 'Wrong username/password' })
                        }
                    }
                })
                req.session.user = {
                    id: userFound.id,
                    name: req.body.username
                }
            })
            .catch(err => {
                res.status(500).send('sorry server is under alien attack')
            })

    }

    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }

    static topup(req, res) {
        let user = req.session.user
        let err = req.query.err || undefined
        Customer.findByPk(req.params.id)
            .then(customer => {
                res.render('topup', { user, customer, numberFormat,err: err})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateBalance(req, res) {
        Customer.findByPk(req.params.id)
            .then(customer => {
                let balance = customer.balance + Number(req.body.balance)
                return Customer.update({
                    balance: balance
                }, {
                    where: {
                        id: customer.id
                    }
                })
            })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }


}

module.exports = CustomerController
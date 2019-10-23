const Customer = require('../models').Customer
const Order = require('../models').Order
const hashPassword = require('../helpers/hashPassword')


class CustomerController {

    static register(req, res) {
        Customer.findOrCreate({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            balance: req.body.balance
        })
            .then(value => {
                if (value[1]) {
                    res.send('success')
                } else {
                    res.send(error)
                }
            })
            .catch(err => {
                res.status(500).send('sorry server is under alien attack')
            })
    }

    static login(req, res) {
        Customer.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(userFound => {
                let passHash = hashPassword(req.body.password, userFound.salt)
                if (userFound.password === passHash) {
                    req.session.user = {
                        id: userFound.id,
                        name: userFound.name
                    }
                    res.redirect(`/`) //---session
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



}

module.exports = CustomerController
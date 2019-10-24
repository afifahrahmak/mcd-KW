const Customer = require('../models').Customer
const Order = require('../models').Order
const bcrypt = require('bcrypt')
const session = require('express-session')
// const hashPassword = require('../helpers/hashPassword')


class CustomerController {

    static registerForm(req,res){
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
        res.render('register',{city,kecamatan})
    }

    static register(req, res) {
        Customer.findOrCreate({where : {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }})
            .then(value => {
                if (value[1]) {
                    res.send('success')
                    res.redirect('/')
                } else {
                    res.send(err.message)
                    // res.render('register', { err: err.message.split(':')[1] })
                }
            })
            .catch(err => {
                console.log(err)
                // res.send(err)
                // res.status(500).send('sorry server is under alien attack')
            })
    }

    static login(req, res) {
        let customerData = null
        Customer.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(userFound => {
                customerData = userFound
                bcrypt.compare(req.body.password,userFound.password,function(err,success){
                    if(err){
                        throw err
                    }else{
                        if(success){
                            res.redirect('/')
                        }else{
                            res.send('Wrong username/password')
                        }
                    }
                })
            })
            .catch(err => {
                res.status(500).send('sorry server is under alien attack')
            })
            req.session.user = {
                id : customerData.id,
                name : req.body.username
            }
    }

    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }


}

module.exports = CustomerController
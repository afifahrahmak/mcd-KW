const Customer = require('../models').Customer
const Order = require('../models').Order
const bcrypt = require('bcrypt')
const session = require('express-session')


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
        let address = `${req.body.city},${req.body.kecamatan},${req.body.address}`
        Customer.findOrCreate({where : {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: address
        }})
            .then(value => {
                if (value[1]) {
                    res.send('success')
                    res.redirect('/')
                } else {
                    res.send(err.message)
                    // res.render('register', { err: err.message.split(':')[1] })
                }
                req.session.user = {
                    id : value.id,
                    name : req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    address : req.body.address
                }
            })
            .catch(err => {
                res.send(err)
                // res.status(500).send('sorry server is under alien attack')
            })
    }

    static loginForm(req,res){
        res.render('login')
    }
    
    static login(req, res) {
        Customer.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(userFound => {
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
            req.session.user = {
                id : userFound.id,
                name : req.body.username
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
        res.render('customers/')
    }


}

module.exports = CustomerController
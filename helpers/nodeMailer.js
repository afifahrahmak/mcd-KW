const nodemailer = require('nodemailer');
const { Menu, Order, Customer } = require('../models');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'newljodi@gmail.com',
        pass: 'screamaimfire123'
    }
});

module.exports = transporter
// // var nodemailer = require('nodemailer');

// function emailSender(email, text = 'receipt') {
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: ' ',
//             pass: ' '
//         }
//     });

//     var mailOptions = {
//         from: ' ',
//         to: email,
//         subject: 'receipt',
//         text: text
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) throw err;
//         console.log('Email sent: ' + info.response);
//     });
// }


// module.exports = emailSender;
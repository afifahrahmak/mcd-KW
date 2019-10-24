const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'newljodi@gmail.com',
        pass: 'screamaimfire123'
    }
   });

   const mailOptions = {
    from: 'newljodi@gmail.com', // sender address
    to: 'imanuelnjodi@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
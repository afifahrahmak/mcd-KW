var nodemailer = require('nodemailer');

function emailSender(email,text = 'Ini nota pembayaran'){
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'putudipadana@gmail.com',
          pass: 'pokemon92'
      }
  });
  
  var mailOptions = {
      from: 'putudipadana@gmail.com',
      to: email,
      subject: 'Nota Pembayaran',
      text: text
  };
  
  transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
  });
}


module.exports = emailSender;
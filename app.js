const express = require("express")
const app = express()
const customerRouter = require('./routers/customerRouter');
const menuRouter = require('./routers/menuRouter');
const orderRouter = require('./routers/orderRouter');
// const session = require('express-session');
const port = process.env.PORT || 3000;


// app.set('trust proxy', 1);
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(__dirname + '/public'));

app.use('/', customerRouter)
app.use('/menu', menuRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
    console.log('mcdKW is running on port', port)
})




// app.get('/',(req,res)=>{
//     res.render('coba')
// })

// app.post('/',(req,res)=>{
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//     to: req.body.email,
//     from: 'imanuelnjodi@gmail.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'mencoba itu baik',
//     html: `<strong>mencoba itu baik</strong>
//             <h1> dan juga menyenangkan </h1>`,
//     };
//     sgMail.send(msg);
//     res.redirect('/')
// })

// app.listen(PORT,()=> console.log(`Listening to port ${PORT}`))
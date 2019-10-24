const express = require("express")
const app = express()
const customerRouter = require('./routers/customerRouter');
const menuRouter = require('./routers/menuRouter');
const orderRouter = require('./routers/orderRouter');
const session = require('express-session');
const port = process.env.PORT || 3000;


app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/aelah',(req,res)=>{
    res.render('test')
})

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

app.use('/', customerRouter)
app.use('/menu', menuRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
    console.log('mcdKW is running on port', port)
})
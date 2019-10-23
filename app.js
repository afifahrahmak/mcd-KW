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

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)
app.use(express.static(__dirname + '/public'));

const loginMiddleware = (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect('/login')
    }
}
app.use(loginMiddleware)

app.use('/', customerRouter)
app.use('/menu', menuRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
    console.log('mcdKW is running on port', port)
})
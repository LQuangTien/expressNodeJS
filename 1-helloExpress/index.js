//package
require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var csurf = require('csurf')

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productRoute = require('./routes/product.route')
var cartRoute = require('./routes/cart.route')
var transferRoute = require('./routes/transfer.route')
//middleware
var authMiddleware = require('./middlewares/auth.middleware')
var sessionMiddleware = require('./middlewares/session.middleware')


const port = 3000 
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware)


app.set('view engine', 'pug')
app.set('views','./views')


var users =  [
            {id: 1, name: 'Tien'},
            {id: 2, name: 'Alabaca'}
]


app.get('/', function (req, res) {
    res.render('index',{
        name: 'Tien'
    })
})
 
app.use('/users', authMiddleware.requireAuth,  userRoute)
app.use('/auth', authRoute)
app.use(csurf({cookie: true}))
app.use('/products', productRoute)
app.use('/cart', cartRoute)
app.use('/transfer', authMiddleware.requireAuth, transferRoute)

app.listen(port, () => console.log('Server start'))

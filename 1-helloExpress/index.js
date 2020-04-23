//package
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
//middleware
const authMiddleware = require('./middlewares/auth.middleware')

const port = 3000 
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser('asdasdasd'))

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


app.listen(port, () => console.log('Server start'))

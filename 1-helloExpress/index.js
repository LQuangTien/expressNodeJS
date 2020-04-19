const express = require('express')
const bodyParser = require('body-parser')

var userRoute = require('./routes/user.route')

const port = 3000 

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
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
 
app.use('/users', userRoute)

app.listen(port, () => console.log('Server start'))

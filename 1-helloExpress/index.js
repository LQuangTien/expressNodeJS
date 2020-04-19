const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const shortid = require('shortid')
db = low(adapter)
db.defaults({users: [] }).write()

const port = 3000 

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
 
app.get('/users', function(req, res){
    res.render('users/index',{ 
        users: db.get('users').value()
    })
})
app.get('/users/search', function(req, res){
    var q = req.query.q
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        users: matchedUsers
    })
})
app.get('/users/create', function(req, res){
    res.render('users/create')
})
app.get('/users/:id', function(req, res){
    var id = req.params.id
    var user = db.get("users").find({id: id}).value()

    res.render('users/view',{
        user: user
    })
})
app.post('/users/create', function(req, res){
    req.body.id = shortid.generate()
    db.get('users').push(req.body).write()
    res.redirect('/users')
})




app.listen(port, () => console.log('Server start'))


var express = require('express')
var todoController=require('./controller/todoController')
var app =express()
app.set('view engine','ejs')
app.use(express.static('./public'))
// all todo controller
todoController(app)


//app to listen
app.listen(3000)
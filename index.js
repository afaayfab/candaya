'use strict'
var express = require('express');
var app = express()
var http = require('http').Server(app)

let router = express.Router()
var mongoose = require('./api/util/mongooseUtil')
var userController = require('./api/controller/api_user')
let auth = require('./api/controller/auth')
let config = require('./config')
router.route('/api/user').get(userController.findAll).post(userController.add)
router.route('/api/user/:id').get(userController.getById).post(userController.update).delete(userController.delete)
router.route('/auth').post(auth.authTokenLogin)
app.use(router)

http.listen(config.dev.port, function () {
    console.log("listening...")
})
module.exports = http
/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/
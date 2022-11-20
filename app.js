'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var user_routes = require('./Rutas/usuarioRuta')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http

// rutas base
app.use('/api', user_routes);

//app.get('/pruebas', function(req, res) {
//res.status(200).send({ mesage: 'Bienvenida al curso Hanna Martinez' });
//});

module.exports = app;
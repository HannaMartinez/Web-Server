'use strict'

var express = require('express');
var UsuarioControl = require('../controlador/usuarioControl');

var api = express.Router();

api.get('/probando-controador', UsuarioControl.prueba);

module.exports = api;
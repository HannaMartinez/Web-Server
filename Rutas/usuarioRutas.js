'use strict'

var express = require('express');
var UsuarioControl = require('../Controlador/usuarioControl');

var api = express.Router();

api.get('/probando-controador', UsuarioControl.prueba);
api.post('/registro', UsuarioControl.registrarUsuario);

module.exports = api;
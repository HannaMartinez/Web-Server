'use strict'

var express = require('express');
var UsuarioControl = require('../Controlador/usuarioControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './cargas/usuario' });

api.get('/probando-controlador', UsuarioControl.prueba);
api.post('/registrar', UsuarioControl.registrarUsuario);
api.post('/login', UsuarioControl.accesoUsuario);
api.put('/actualizar-usuario/:id', md_auth.validarAcceso, UsuarioControl.actualizarUsuario);
api.post('/actualizar-imagen-usuario/:id', [md_auth.validarAcceso, dir_fotos], UsuarioControl.actualizarFoto);
api.get('/get-imagen-usuario/:imageFile', UsuarioControl.getFoto);

module.exports = api;
'use strict'

var bcrypt = require('bcrypt');
var usuariosModelo = require('../Modelo/Usuarios')

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador el usuario del api REST con nede y mongo'
    });
}

function registrarUsuarios(req, res) {
    var usuarios = new usuariosModelo();

    var params = req.body; //recibe todos los datos por POST
    console.log(params);

    usuarios.nombre = params.nombre;
    usuarios.apellido = params.apellido;
    usuarios.email = params.email;
    usuarios.pasword = params.pasword;
    usuarios.rol = 'ROLE_USER';
    usuarios.imagen = 'null';

    if (params.pasword) {
        //encriptar contraseña y guardar datos
    } else {
        res.status(500).send({
            mesagge: 'Introduce la contraseña'
        })
    }
}

module.exports = {
    prueba
};
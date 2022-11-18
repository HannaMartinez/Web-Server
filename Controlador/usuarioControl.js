'use strict'

const bcrypt = require('bcrypt');
var usuariosModelo = require('../Modelo/Usuarios');
var usuario = new usuariosModelo();

var usuariosModelo = require('../Modelo/Usuarios');

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador el usuario del api REST con nede y mongo'
    });
}

function registrarUsuario(req, res) {
    var usuario = new usuariosModelo();

    var params = req.body; //recibe todos los datos por POST
    console.log(params);

    usuario.nombre = params.nombre;
    usuario.apellido = params.apellido;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.rol = 'ROLE_USER';
    usuario.imagen = 'null';

    if (params.password) {
        //encriptar contraseña y guardar datos
        bcrypt.hash(params.password, 10, function(err, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellido != null && usuario.email != null) {
                //guardar el usuario en BD
                usuario.save((err, usuarioAlmacenado) => {
                    if (err) {
                        res.status(500).send({
                            mesagge: 'Error al guardar el usuario'
                        });

                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({
                                mesagge: 'No se ha registado el usuario'
                            });

                        } else {
                            //nos devuelve un objeto con los datos del usuario guardado
                            res.status(200).send({
                                usuarios: usuarioAlmacenado
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    mesagge: 'Introduce todos los campos'
                });
            }
        });

    } else {
        res.status(500).send({
            mesagge: 'Introduce la contraseña'
        });
    }
}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuariosModelo.findOne({
        email: email
    }, (err, user) => {
        if (!user) {
            res.status(404).send({
                mesagge: 'El usuario no existe'
            });
        } else {
            bcrypt.compare(password, usuario.password, function(err, check) {
                if (check) {
                    //devolver los datos del usuario logeado
                    console.log('coinside el password')
                    if (params.gethash) {
                        //devolver un token de jwt
                    } else {
                        res.status(200).send({
                            user: user
                        });
                    }
                } else {
                    res.status(404).send({
                        mesagge: 'El usuario no se a identificado'
                    });
                }
            });
        }
    });
}

module.exports = {
    prueba,
    registrarUsuario,
    accesoUsuario
};
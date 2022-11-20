'use strict'

var bcrypt = require('bcrypt');
const use = require('../app');
var usuariosModelo = require('../Modelo/usuarios');
var usuario = usuariosModelo();
var jwt = require('../Servicio/jwt')
var fs = require('fs');
var path = require('path');

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api REST con node y mongo'
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
                            mesagge: 'Error al guardar el usurio'
                        });
                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({
                                mesagge: 'No se ha registrado el usuario'
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
        })
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
            bcrypt.compare(password, user.password, function(err, check) {
                if (check) {
                    //devolver los datos del usuario logeado
                    console.log('coincide el password')
                    if (params.gethash) {
                        //devolver un token de jwt
                        res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        res.status(200).send({
                            user: user
                        });
                    }
                } else {
                    res.status(404).send({
                        mesagge: 'El usuario no se ha identificado'
                    });
                }
            });
        }
    });
}

function actualizarUsuario(req, res) {
    var userId = req.params.id;
    var update = req.body

    usuariosModelo.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el usuario en el servidor'
            });
        } else {
            if (!userUpdate) {
                res.status(404).send({
                    message: 'No se ha podido encontar el usuario'
                });
            } else {
                res.status(200).send({
                    user: userUpdate
                });
            }
        }
    });
}

function actualizarFoto(req, res) {
    var UserId = req.params.id;
    if (req.files) {
        var file_path = req.files.image.path;
        var file_arreglo = file_path.split('\\'); //     cargas\usuario\foto.jpg
        var file_name = file.arreglo[2];
        var extension = file_arreglo[2].split('\.');
        if (extension[1] == 'png' || extension[1] == 'gif' || extension[1] == 'jpg') {
            usuariosModelo.findByIdAndUpdate(UserId, {
                imagen: file_arreglo[2]
            }, (err, user) => {
                if (err) {
                    res.status(500).send({
                        mesagge: 'Error al buscar el usuario'
                    });
                }
                if (!user) {
                    res.status(404).send({
                        mesagge: 'Error en el id'
                    });
                } else {
                    res.status(200).send({
                        image: file_name,
                        user: user
                    });
                }
            })
        } else {
            res.status(404).send({
                mesagge: 'El formato no es adecuado'
            });
        }
    } else {
        res.status(404).send({
            mesagge: 'No cargo el archivo.....'
        });
    }
}

function getFoto(req, res) {
    var imageFile = req.params.imageFile;
    var rutaFoto = './cargas/usuario/' + imageFile;
    console.log(imageFile);
    fs.exists(rutaFoto, function(existe) {
        if (existe) {
            res.sendFile(path.resolve(rutaFoto));
        } else {
            res.status(404).send({
                mesagge: 'No has cargado una imagen con ese nombre'
            });
        }
    })

}

module.exports = {
    prueba,
    registrarUsuario,
    accesoUsuario,
    actualizarUsuario,
    actualizarFoto,
    getFoto
};
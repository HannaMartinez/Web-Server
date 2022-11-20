'use strict'

var jwt = require('jwt-simple');
var momento = require('moment');
var claveSecretaInterna = 'panda';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        imagen: user.imagen,
        iat: momento().unix(),
        exp: momento().add(30, 'days').unix
    };

    return jwt.encode(payload, claveSecretaInterna);
};
'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaUsuarios = Schema({
    nombre: String,
    apellido: String,
    email: String,
    paswoord: String,
    rol: String,
    image: String
});

module.exports = mongoose.model('Usuarios', EsquemaUsuarios);
'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaArtista = Schema({
    nombre: String,
    adescripcion: String,
    imagen: String
});

module.exports = mongoose.model('Artistas', EsquemaArtistas);
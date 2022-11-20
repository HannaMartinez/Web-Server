'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaCanciones = Schema({
    numero: String,
    nombre: String,
    duracion: String,
    file: String,
    Album: { type: Schema.ObjectId, ref: "Album" }
});

module.exports = mongoose.model('Cancion', EsquemaCanciones);
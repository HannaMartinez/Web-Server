'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaAlbum = Schema({
    titulo: String,
    dscripcion: String,
    year: String,
    imagen: String,
    Artista: {
        type: Schema.objectId,
        ref: "Artista"
    }
});

module.exports = mongoose.model('Album', EsquemaAlbum)
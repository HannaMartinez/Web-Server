var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/proyecto', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("conexion exitosa");
        app.listen(port, function() {
            console.log("Servidor de api rest de musica eschuando en http://localhost:" + port);
        });
    }
})
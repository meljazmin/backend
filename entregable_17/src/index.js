const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(config.database.url, config.database.options);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /* en caso de una excepcion no atrapada */
// app.use((err, req, res, next) => {
//     console.error(err.message);
//     res.status(500).send(err);
// });

/* configuro las rutas */
app.use('/api', require('./routes/mensajes'));
app.use('/api', require('./routes/productos'));

// Acá se atrapa los requests de recursos no encontrados (404)
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: `La ruta ${req.path} no ha sido implementada`
    });
});

// Acá se atrapan los errores
app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    } else {
        res.status(500).send({
            status: 500,
            error: err.toString()
        });
    }
});

/* obtengo el puerto del enviroment o de la configuracion de la app */
const puerto = process.env.PORT || config.app.PUERTO;

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});

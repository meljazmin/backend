'use strict';

var express = require('express');
var productos = require('./api/productos');
var handlebars = require('express-handlebars');
var socketio = require('socket.io');
var http = require('http');
var fs = require('fs');
var os = require('os');
var path = require('path');

var app = express();
var httpServer = http.createServer(app);
var io = socketio(httpServer, {});
var messageFile = path.join(os.tmpdir(), 'messages.json');

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

var apiRouter = express.Router();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use(function (req, res, next) {
    console.log('tiempo:', new Date().toLocaleString());
    next();
});

/**
 * Metodo para obtener el path param "id" desde el objeto req {@link express.Request}.
 * 
 * Si el param existe, devuelve el id en tipo numerico.
 * 
 * Si el param no existe, setea el response con 400 Bad Request y retorna.
 * @param {*} req 
 * @returns 
 */
var getIdFromRequestParams = function getIdFromRequestParams(req) {
    var id = req.params.id;

    if (!id) throw Error('Id nulo');

    return Number(id);
};

apiRouter.get('/productos/listar', function (req, res) {
    var productosLista = productos.listar();
    if (productosLista.length === 0) {
        res.status(404).send({ error: 'no hay productos cargados' });
    } else {
        res.send(productosLista);
    }
});

apiRouter.get('/productos/listar/:id', function (req, res) {
    var id = getIdFromRequestParams(req);
    if (!id) return;

    var producto = productos.obtenerPorId(id);
    if (!producto) {
        res.status(404).send({ error: 'producto no encontrado' });
    } else {
        res.send(producto);
    }
});

apiRouter.post('/productos/guardar', function (req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        price = _req$body.price,
        thumbnail = _req$body.thumbnail;

    price = parseFloat(price);
    try {
        var productoCreado = productos.agregarProducto(title, price, thumbnail);
        res.status(201).send(productoCreado);
    } catch (e) {
        res.status(400).send({ error: e.toString() });
    }
});

apiRouter.put('/productos/actualizar/:id', function (req, res) {
    // const { title, price, thumbnail } = req.body;
    var id = getIdFromRequestParams(req);
    if (!id) return;

    var producto = productos.actualizarProducto(id, req.body);

    res.send(producto);
});

apiRouter.delete('/productos/borrar/:id', function (req, res) {
    var id = getIdFromRequestParams(req);
    if (!id) return;

    productos.borrarProducto(id);

    res.status(204).send();
});

app.use('/api', apiRouter);

app.get('/productos/view', function (req, res) {
    var lista = productos.listar();
    res.render('view', { hayProductos: lista.length > 0, productos: lista });
});

app.use('/', express.static('public'));

io.on('connection', function (socket) {
    console.info('New connection');
    var lista = productos.listar();
    socket.emit('productos', lista);
});

//Chat de mensajes
var messages = [{
    email: 'pfernandez@hotmail.com', fecha: new Date(), texto: 'Bienvenidos!'
}, {
    email: 'camarasfotograficas@gmail.com', fecha: new Date(), texto: 'Guau, guau!'
}];

// cuando se conecta el cliente, emite los mensajes 
io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function (message) {
        message.fecha = new Date();
        messages.push(message);
        io.sockets.emit('messages', messages);
        fs.promises.writeFile(messageFile, JSON.stringify(messages)).then(function () {
            console.debug('Mensajes guardados en ' + messageFile);
        });
    });
});

// Puerto donde escucha el servidor 
var puerto = 8080;

// const server = app.listen(puerto, () => {
//     console.log(`servidor escuchando en http://localhost:${puerto}`);
// });

var server = httpServer.listen(puerto, function () {
    console.log('servidor escuchando en http://localhost:' + puerto);
});

// En caso de error
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});

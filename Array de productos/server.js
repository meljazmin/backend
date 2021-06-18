const express = require('express');
const productos = require('./api/productos');
const handlebars = require('express-handlebars');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer, {});

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

const apiRouter = express.Router();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));


apiRouter.use((req, res, next) => {
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
const getIdFromRequestParams = (req) => {
    let id = req.params.id;

    if (!id) throw Error('Id nulo');

    return Number(id);
}

apiRouter.get('/productos/listar', (req, res) => {
    const productosLista = productos.listar();
    if (productosLista.length === 0) {
        res.status(404).send({ error: 'no hay productos cargados' });
    } else {
        res.send(productosLista);
    }
});

apiRouter.get('/productos/listar/:id', (req, res) => {
    const id = getIdFromRequestParams(req);
    if (!id) return;

    const producto = productos.obtenerPorId(id);
    if (!producto) {
        res.status(404).send({ error: 'producto no encontrado' });
    } else {
        res.send(producto);
    }
});

apiRouter.post('/productos/guardar', (req, res) => {
    let { title, price, thumbnail } = req.body;
    price = parseFloat(price);
    try {
        const productoCreado = productos.agregarProducto(title, price, thumbnail);
        res.status(201).send(productoCreado);
    } catch (e) {
        res.status(400).send({ error: e.toString() });
    }
});


apiRouter.put('/productos/actualizar/:id', (req, res) => {
    // const { title, price, thumbnail } = req.body;
    const id = getIdFromRequestParams(req);
    if (!id) return;

    const producto = productos.actualizarProducto(id, req.body);

    res.send(producto);
});


apiRouter.delete('/productos/borrar/:id', (req, res) => {
    const id = getIdFromRequestParams(req);
    if (!id) return;

    productos.borrarProducto(id);

    res.status(204).send();
});

app.use('/api', apiRouter);

app.get('/productos/view', (req, res) => {
    const lista = productos.listar();
    res.render('view', { hayProductos: lista.length > 0, productos: lista });
});

app.use('/', express.static('public'));

io.on('connection', (socket) => {
    console.info('New connection');
    const lista = productos.listar();
    socket.emit('productos', lista);
});


//Chat de mensajes
const messages = [
    {
        email: 'pfernandez@hotmail.com', fecha: new Date(), texto: 'Bienvenidos!'
    },
    {
        email: 'camarasfotograficas@gmail.com', fecha: new Date(), texto: 'Guau, guau!'
    }
]

// cuando se conecta el cliente, emite los mensajes 
io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function (message) {
        message.fecha = new Date();
        messages.push(message);
        io.sockets.emit('messages', messages);
    });
});




// Puerto donde escucha el servidor 
const puerto = 8080;

// const server = app.listen(puerto, () => {
//     console.log(`servidor escuchando en http://localhost:${puerto}`);
// });

const server = httpServer.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// En caso de error
server.on('error', error => {
    console.log('error en el servidor:', error);
});
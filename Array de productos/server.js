const express = require('express');
const productos = require('./api/productos');

const app = express();
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
    let { titulo, precio, thumbnail } = req.body;
    precio = parseFloat(precio);
    try {
        const productoCreado = productos.agregarProducto(titulo, precio, thumbnail);
        res.status(201).send(productoCreado);
    } catch (e) {
        res.status(400).send({ error: e.toString() });
    }
});


apiRouter.put('/productos/actualizar/:id', (req, res) => {
    // const { titulo, precio, thumbnail } = req.body;
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

app.use('/', express.static('public'));

// Puerto donde escucha el servidor 
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// En caso de error
server.on('error', error => {
    console.log('error en el servidor:', error);
});
const express = require('express');
const productos = require('./api/productos');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/productos/listar', (req, res) => {
    const productosLista = productos.listar();
    if (productosLista.length === 0) {
        res.status(404).send({ error: 'no hay productos cargados' });
    } else {
        res.send(productosLista);
    }
});

app.get('/api/productos/listar/:id', (req, res) => {
    const producto = productos.obtenerPorId(parseInt(req.params.id));
    if (!producto) {
        res.status(404).send({ error: 'producto no encontrado' });
    } else {
        res.send(producto);
    }
});

app.post('/api/productos/guardar', (req, res) => {
    const { titulo, precio, thumbnail } = req.body;
    try {
        const productoCreado = productos.agregarProducto(titulo, precio, thumbnail);
        res.status(201).send(productoCreado);
    } catch (e) {
        res.status(400).send({ error: e.toString() });
    }
});


// Puerto donde escucha el servidor 
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// En caso de error
server.on('error', error => {
    console.log('error en el servidor:', error);
});
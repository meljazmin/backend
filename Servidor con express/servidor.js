const express = require('express');
const fs = require('fs');
const app = express();
const puerto = 8080;

let cantidadVisitasItems = 0;
let cantidadVisitasItemRandom = 0;

const obtenerProductos = () => {
    return JSON.parse(fs.readFileSync('productos.json').toString());
}

app.get('/items', (req, res) => {
    cantidadVisitasItems++;
    const body = {};
    body.items = obtenerProductos();
    body.cantidad = body.items.length;
    res.json(body);
});

app.get('/item-random', (req, res) => {
    cantidadVisitasItemRandom++;
    const productos = obtenerProductos();
    const pos = Math.floor(Math.random() * (productos.length - 1));
    res.json({ item: productos[pos] });
});

app.get('/visitas', (req, res) => {
    res.json({ visitas: { items: cantidadVisitasItems, item: cantidadVisitasItemRandom } });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`);
});
const express = require('express');
const router = express.Router();
const controlador = require('../api/productos');

router.post('/productos', async (req, res) => {
    try {
        await controlador.create(req.body);
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/productos/:id?', async (req, res) => {
    try {
        res.send(await controlador.read(req.params.id));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.put('/productos/:id', async (req, res) => {
    try {
        await controlador.update(req.params.id, req.body);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.delete('/productos/:id', async (req, res) => {
    try {
        await controlador.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;
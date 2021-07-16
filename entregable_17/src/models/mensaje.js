const mongoose = require('mongoose');

const collection = 'mensajes';

const MensajeSchema = new mongoose.Schema({
    mensaje: { type: String, required: true },
    email: { type: String, required: true },
    fecha: { type: Date, required: true }
});

module.exports = mongoose.model(collection, MensajeSchema);
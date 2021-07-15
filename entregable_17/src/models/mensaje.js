import mongoose from 'mongoose';

const collection = 'mensajes';

const MensajeSchema = new mongoose.Schema({
    mensaje: { type: String, require: true },
    email: { type: String, require: true },
    fecha: { type: Date, require: true }
});

export const mensajes = mongoose.model(collection, MensajeSchema);
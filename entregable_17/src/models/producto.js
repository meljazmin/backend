const mongoose = require('mongoose');

const collection = 'productos';

const ProductosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: Date }
});

module.exports = mongoose.model(collection, ProductosSchema);
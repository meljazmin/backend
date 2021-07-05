const Producto = require('../models/producto');

class ProductoController {
    async create(producto) {
        await Producto.create(producto);
    }

    async read(id) {
        return await Producto.read(id);
    }

    async update(id, producto) {
        await Producto.update(id, producto);
    }

    async delete(id) {
        await Producto.delete(id);
    }
}

module.exports = new ProductoController();
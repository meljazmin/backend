const Producto = require('../models/producto');

class ProductoController {
    async create(p) {
        const producto = new Producto(p);
        await producto.save();
    }

    async read(id) {
        if (id) {
            return await Producto.findById(id);
        } else {
            return await Producto.find({});
        }

    }

    async update(id, producto) {
        await Producto.updateOne({ _id: id }, producto);
    }

    async delete(id) {
        await Producto.deleteOne({ _id: id });
    }
}

module.exports = new ProductoController();
const { productosBBDD } = require('../database/knex');

class Producto {
    async create(producto) {
        await productosBBDD('productos').insert(producto);
    }
    async read(id) {
        if (!id) {
            return await productosBBDD('productos');
        } else {
            return await productosBBDD('productos').where({ id })
        }
    }
    async update(id, producto) {
        await productosBBDD('productos').where({id}).update(producto);
    }
    async delete(id) {
        await productosBBDD('productos').where({id}).delete();
    }
}

module.exports = new Producto();
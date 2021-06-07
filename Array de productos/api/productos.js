class Productos {
    constructor() {
        this.productos = [];
    }

    listar() {
        return this.productos;
    }

    obtenerPorId(id) {
        if (typeof id !== 'number') throw new Error("El id no es valido");
        const producto = this.listar().find(producto => {
            return producto.id === id;
        });
        return producto;
    }

    agregarProducto(title, price, thumbnail) {
        if (typeof title !== 'string' || title.length === 0) {
            throw Error("El título no es correcto");
        }
        if (typeof price !== 'number') {
            throw Error("El precio no es correcto");
        }
        if (typeof thumbnail !== 'string' || thumbnail.length === 0) {
            throw Error("El thumbnail no es correcto");
        }
        const id = this.productos.length + 1;
        this.productos.push({ title, price, thumbnail, id });
        return this.obtenerPorId(id);
    }

    actualizarProducto(id, { title, price, thumbnail }) {
        const producto = this.obtenerPorId(id);
        if (!producto) throw new Error(`No existe el producto con id ${id}`);
        producto.title = title || producto.title; // producto.title ? producto.title : title;
        producto.price = price || producto.price;
        producto.thumbnail = thumbnail || producto.thumbnail;

        return producto;
    }

    borrarProducto(id) {
        const pos = this.productos.findIndex(producto => producto.id === id);
        if (pos !== -1) {
            this.productos.splice(pos, 1);
        }else{
            throw Error(`No existe el producto con id ${id}`);
        }
    }
}


module.exports = new Productos();
class Productos {
    constructor() {
        this.productos = [];
    }

    listar() {
        return this.productos;
    }

    obtenerPorId(id){
        if(typeof id !== 'number') throw new Error("El id no es valido");
        const producto = this.listar().find(producto => {
            return producto.id === id;
        });
        return producto;
    }

    agregarProducto(titulo, precio, thumbnail) {
        if (typeof titulo !== 'string' || titulo.length === 0) {
            throw Error("El titulo no es correcto");
        }
        if (typeof precio !== 'number') {
            throw Error("El precio no es correcto");
        }
        if (typeof thumbnail !== 'string' || thumbnail.length === 0) {
            throw Error("El thumbnail no es correcto");
        }
        const id = this.productos.length + 1;
        this.productos.push({ titulo, precio, thumbnail, id });
        return this.obtenerPorId(id);
    }
}


module.exports = new Productos();
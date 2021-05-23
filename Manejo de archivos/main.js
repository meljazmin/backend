const fs = require('fs');


class Archivo {
    filename;

    constructor(filename) {
        this.filename = filename;
    }

    async leer() {
        try {
            await fs.promises.access(this.filename);
        } catch (e) {
            console.warn('No existe el archivo. Se retorna lista vacia.');
            return [];
        }

        const fileContent = await fs.promises.readFile(this.filename);
        const productos = JSON.parse(fileContent);
        console.info(productos);
        return productos;
    }

    async guardar(producto) {
        const productos = await this.leer();
        producto.id = productos.length + 1;
        productos.push(producto);
        await fs.promises.writeFile(this.filename, JSON.stringify(productos));
    }

    async borrar() {
        await fs.promises.unlink(this.filename);
    }
}

const main = async () => {
    try {
        await fs.promises.copyFile('json/productos.original.json', 'json/productos.json');

        // Instancio la clase Archivo
        let archivo = new Archivo('json/productos.json');

        // Leo el archivo
        await archivo.leer();

        // Guardo el archivo
        await archivo.guardar({
            title: "Perfume Natura",
            price: Math.floor(Math.random() * 800),
            thumbnail: 'http://url/'
        });

        // Leo el archivo modificado
        await archivo.leer();

        // Borro el archivo
        await archivo.borrar();

        // Intento leer el archivo borrado
        await archivo.leer();
    } catch (e) {
        console.error('Ocurrio un error', e);
    }
}

main();
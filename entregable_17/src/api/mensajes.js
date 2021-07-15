import model from "../models/mensaje";

class MensajeController {

    constructor() { }

    async guardar(mensaje) {
        try {
            model.mensaje
            return await null;
        } catch (error) {
            throw error;
        }
    }

    async buscar(condicion) {
        try {
            return await Mensaje.buscar(condicion);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MensajeController();
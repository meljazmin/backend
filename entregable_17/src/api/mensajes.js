const Mensaje = require("../models/mensaje");

class MensajeController {

    constructor() { }

    async guardar(mensaje) {
        try {
            const mensajeModel = new Mensaje(mensaje);
            await mensajeModel.save();
        } catch (error) {
            throw error;
        }
    }

    async buscar(condicion) {
        try {
            return await Mensaje.find(condicion);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MensajeController();
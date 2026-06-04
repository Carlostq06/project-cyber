const Consentimiento = require('../models/consent.model');

const getConsentimientosByPaciente = async (req, res) => {
    try {
        const id_paciente = req.params.id_paciente;
        const consentimientos = await Consentimiento.getByPaciente(id_paciente);
        res.json(consentimientos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener consentimientos: " + error.message });
    }
};

const createConsentimiento = async (req, res) => {
    try {
        const nuevoConsentimiento = await Consentimiento.create(req.body);
        res.status(201).json(nuevoConsentimiento);
    } catch (error) {
        res.status(500).json({ error: "Error al registrar consentimiento: " + error.message });
    }
};

module.exports = { getConsentimientosByPaciente, createConsentimiento };
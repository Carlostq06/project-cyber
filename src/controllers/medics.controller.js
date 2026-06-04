const Medico = require('../models/medics.model');

const getMedicos = async (req, res) => {
    try {
        const medicos = await Medico.getAll();
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener médicos: " + error.message });
    }
};

const getMedicoById = async (req, res) => {
    try {
        const medico = await Medico.getById(req.params.id);
        if (!medico) return res.status(404).json({ error: "Médico no encontrado" });
        res.json(medico);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el médico: " + error.message });
    }
};

const createMedico = async (req, res) => {
    try {
        const nuevoMedico = await Medico.create(req.body);
        res.status(201).json(nuevoMedico);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "El número de colegiado o email ya existe." });
        }
        res.status(500).json({ error: "Error al registrar médico: " + error.message });
    }
};

module.exports = { getMedicos, getMedicoById, createMedico };
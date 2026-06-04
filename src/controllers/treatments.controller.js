const Tratamiento = require('../models/treatments.model');

const getTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.getAll();
        res.json(tratamientos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tratamientos: " + error.message });
    }
};

const getTratamientoById = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.getById(req.params.id);
        if (!tratamiento) return res.status(404).json({ error: "Tratamiento no encontrado" });
        res.json(tratamiento);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el tratamiento: " + error.message });
    }
};

const createTratamiento = async (req, res) => {
    try {
        const nuevoTratamiento = await Tratamiento.create(req.body);
        res.status(201).json(nuevoTratamiento);
    } catch (error) {
        res.status(500).json({ error: "Error al crear tratamiento: " + error.message });
    }
};

module.exports = { getTratamientos, getTratamientoById, createTratamiento };
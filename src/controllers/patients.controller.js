const Paciente = require('../models/patients.model');

const getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.getAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener pacientes: " + error.message });
    }
};

const getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.getById(req.params.id);
        if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el paciente: " + error.message });
    }
};

const createPaciente = async (req, res) => {
    try {
        const { dni, nombre, apellidos, fecha_nacimiento, telefono, email } = req.body;
        if (!dni || !nombre || !apellidos || !email) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const nuevoPaciente = await Paciente.create(req.body);
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "El DNI o Email ya está registrado." });
        }
        res.status(500).json({ error: "Error al registrar paciente: " + error.message });
    }
};

module.exports = { getPacientes, getPacienteById, createPaciente };
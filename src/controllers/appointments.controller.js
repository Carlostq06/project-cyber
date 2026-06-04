const Cita = require('../models/appointments.model');

const getCitas = async (req, res) => {
    try {
        const citas = await Cita.getAll();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener citas: " + error.message });
    }
};

const createCita = async (req, res) => {
    try {
        const { id_paciente, id_medico, fecha_hora } = req.body;
        if (!id_paciente || !id_medico || !fecha_hora) {
            return res.status(400).json({ error: "Paciente, médico y fecha son obligatorios" });
        }

        const nuevaCita = await Cita.create(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).json({ error: "Error al agendar cita: " + error.message });
    }
};

const updateEstadoCita = async (req, res) => {
    try {
        const { estado } = req.body;
        const citaActualizada = await Cita.updateEstado(req.params.id, estado);
        res.json({ msg: "Estado de cita actualizado", data: citaActualizada });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar cita: " + error.message });
    }
};

module.exports = { getCitas, createCita, updateEstadoCita };
const pool = require('../config/conex');
const { cifrar, descifrar } = require('../utilities/crypto');

const Cita = {
    getAll: async () => {
        const query = `
            SELECT c.*, 
                   CONCAT(p.nombre, ' ', p.apellidos) AS paciente_nombre,
                   CONCAT(m.nombre, ' ', m.apellidos) AS medico_nombre,
                   t.nombre_tratamiento
            FROM Citas c
            JOIN Pacientes p ON c.id_paciente = p.id_paciente
            JOIN Medicos m ON c.id_medico = m.id_medico
            LEFT JOIN Tratamientos t ON c.id_tratamiento = t.id_tratamiento
        `;
        const [rows] = await pool.query(query);
        return rows.map(c => ({ ...c, notas_medicas: descifrar(c.notas_medicas) }));
    },

    create: async (datos) => {
        const { id_paciente, id_medico, id_tratamiento, fecha_hora, notas_medicas } = datos;
        const notasCifradas = cifrar(notas_medicas);

        const query = `INSERT INTO Citas (id_paciente, id_medico, id_tratamiento, fecha_hora, notas_medicas) 
                       VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [id_paciente, id_medico, id_tratamiento, fecha_hora, notasCifradas]);
        return { id_cita: result.insertId, ...datos };
    },

    updateEstado: async (id_cita, nuevoEstado) => {
        const query = `UPDATE Citas SET estado = ? WHERE id_cita = ?`;
        await pool.query(query, [nuevoEstado, id_cita]);
        return { id_cita, estado: nuevoEstado };
    }
};

module.exports = Cita;
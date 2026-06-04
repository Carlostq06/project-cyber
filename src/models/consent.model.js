const pool = require('../config/conex');

const Consentimiento = {
    getByPaciente: async (id_paciente) => {
        const query = `
            SELECT con.*, t.nombre_tratamiento 
            FROM Consentimientos con
            JOIN Tratamientos t ON con.id_tratamiento = t.id_tratamiento
            WHERE con.id_paciente = ?
        `;
        const [rows] = await pool.query(query, [id_paciente]);
        return rows;
    },

    create: async (datos) => {
        const { id_paciente, id_tratamiento, ruta_documento_pdf, hash_documento, firmado_digitalmente } = datos;

        const query = `INSERT INTO Consentimientos (id_paciente, id_tratamiento, ruta_documento_pdf, hash_documento, firmado_digitalmente) 
                       VALUES (?, ?, ?, ?, ?)`;

        const [result] = await pool.query(query, [id_paciente, id_tratamiento, ruta_documento_pdf, hash_documento, firmado_digitalmente ?? true]);
        return { id_consentimiento: result.insertId, ...datos };
    }
};

module.exports = Consentimiento;
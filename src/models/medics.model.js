const pool = require("../config/conex")

const Medico = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM Medicos');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM Medicos WHERE id_medico = ?', [id]);
        return rows[0] || null;
    },

    create: async (datos) => {
        const { numero_colegiado, nombre, apellidos, especialidad, email_corporativo } = datos;
        const query = `INSERT INTO Medicos (numero_colegiado, nombre, apellidos, especialidad, email_corporativo) 
                       VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [numero_colegiado, nombre, apellidos, especialidad, email_corporativo]);
        return { id_medico: result.insertId, ...datos };
    }
};

module.exports = Medico;
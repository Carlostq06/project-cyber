const pool = require("../config/conex")
const { cifrar, descifrar } = require('../utilities/crypto');

const Paciente = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM Pacientes');
        return rows.map(p => ({ ...p, dni: descifrar(p.dni) }));
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM Pacientes WHERE id_paciente = ?', [id]);
        if (rows.length === 0) return null;
        rows[0].dni = descifrar(rows[0].dni);
        return rows[0];
    },

    create: async (datos) => {
        const { dni, nombre, apellidos, fecha_nacimiento, telefono, email } = datos;
        const dniCifrado = cifrar(dni);

        const query = `INSERT INTO Pacientes (dni, nombre, apellidos, fecha_nacimiento, telefono, email) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [dniCifrado, nombre, apellidos, fecha_nacimiento, telefono, email]);
        return { id_paciente: result.insertId, ...datos };
    }
};

module.exports = Paciente;
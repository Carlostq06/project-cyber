const pool = require("../config/conex")

const Tratamiento = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM Tratamientos');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM Tratamientos WHERE id_tratamiento = ?', [id]);
        return rows[0] || null;
    },

    create: async (datos) => {
        const { nombre_tratamiento, descripcion, coste_base } = datos;
        const query = `INSERT INTO Tratamientos (nombre_tratamiento, descripcion, coste_base) VALUES (?, ?, ?)`;
        const [result] = await pool.query(query, [nombre_tratamiento, descripcion, coste_base]);
        return { id_tratamiento: result.insertId, ...datos };
    }
};

module.exports = Tratamiento;
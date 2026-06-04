const pool = require('../config/conex');

const Factura = {
    getAll: async () => {
        const query = `
            SELECT f.*, c.fecha_hora AS fecha_cita, CONCAT(p.nombre, ' ', p.apellidos) AS paciente_nombre
            FROM Facturas f
            JOIN Citas c ON f.id_cita = c.id_cita
            JOIN Pacientes p ON c.id_paciente = p.id_paciente
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    create: async (datos) => {
        const { id_cita, importe_total, metodo_pago } = datos;
        const query = `INSERT INTO Facturas (id_cita, importe_total, metodo_pago) VALUES (?, ?, ?)`;
        const [result] = await pool.query(query, [id_cita, importe_total, metodo_pago]);
        return { id_factura: result.insertId, ...datos };
    },

    updateEstadoPago: async (id_factura, nuevoEstado) => {
        const query = `UPDATE Facturas SET estado_pago = ? WHERE id_factura = ?`;
        await pool.query(query, [nuevoEstado, id_factura]);
        return { id_factura, estado_pago: nuevoEstado };
    }
};

module.exports = Factura;
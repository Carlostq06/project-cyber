const Factura = require('../models/invoices.model');

const getFacturas = async (req, res) => {
    try {
        const facturas = await Factura.getAll();
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener facturas: " + error.message });
    }
};

const createFactura = async (req, res) => {
    try {
        const { id_cita, importe_total } = req.body;
        if (!id_cita || !importe_total) {
            return res.status(400).json({ error: "La cita y el importe son obligatorios" });
        }

        const nuevaFactura = await Factura.create(req.body);
        res.status(201).json(nuevaFactura);
    } catch (error) {
        res.status(500).json({ error: "Error al generar factura: " + error.message });
    }
};

const updateEstadoPago = async (req, res) => {
    try {
        const { estado_pago } = req.body;
        const facturaActualizada = await Factura.updateEstadoPago(req.params.id, estado_pago);
        res.json({ msg: "Estado de pago actualizado", data: facturaActualizada });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar pago: " + error.message });
    }
};

module.exports = { getFacturas, createFactura, updateEstadoPago };
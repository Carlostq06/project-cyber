const express = require('express');
const router = express.Router();
const facturaController = require('../../controllers/invoices.controller');

router.get('/', facturaController.getFacturas);
router.post('/', facturaController.createFactura);
router.put('/:id/pago', facturaController.updateEstadoPago);

module.exports = router;
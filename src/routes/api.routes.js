const express = require('express');
const router = express.Router();

const pacienteRoutes = require('./api.routes/patients.routes');
const medicoRoutes = require('./api.routes/medics.routes');
const tratamientoRoutes = require('./api.routes/treatments.routes');
const citaRoutes = require('./api.routes/appointments.routes');
const consentimientoRoutes = require('./api.routes/consent.routes');
const facturaRoutes = require('./api.routes/invoices.routes');

router.use('/pacientes', pacienteRoutes);
router.use('/medicos', medicoRoutes);
router.use('/tratamientos', tratamientoRoutes);
router.use('/citas', citaRoutes);
router.use('/consentimientos', consentimientoRoutes);
router.use('/facturas', facturaRoutes);

module.exports = router;
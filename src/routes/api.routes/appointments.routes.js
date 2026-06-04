const express = require('express');
const router = express.Router();
const citaController = require('../../controllers/appointments.controller');

router.get('/', citaController.getCitas);
router.post('/', citaController.createCita);
router.put('/:id/estado', citaController.updateEstadoCita);

module.exports = router;
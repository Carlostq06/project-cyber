const express = require('express');
const router = express.Router();
const consentimientoController = require('../../controllers/consent.controller');

router.get('/paciente/:id_paciente', consentimientoController.getConsentimientosByPaciente);
router.post('/', consentimientoController.createConsentimiento);

module.exports = router;
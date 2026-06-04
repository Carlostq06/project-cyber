const express = require('express');
const router = express.Router();
const pacienteController = require('../../controllers/patients.controller');

router.get('/', pacienteController.getPacientes);
router.get('/:id', pacienteController.getPacienteById);
router.post('/', pacienteController.createPaciente);

module.exports = router;
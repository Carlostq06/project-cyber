const express = require('express');
const router = express.Router();
const tratamientoController = require('../../controllers/treatments.controller');

router.get('/', tratamientoController.getTratamientos);
router.get('/:id', tratamientoController.getTratamientoById);
router.post('/', tratamientoController.createTratamiento);

module.exports = router;
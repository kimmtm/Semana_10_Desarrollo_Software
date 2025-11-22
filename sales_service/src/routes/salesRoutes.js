const express = require('express');
const router = express.Router();
const controller = require('../controllers/salesController');

router.get('/', controller.getAll); // Obtener todas las ventas
router.get('/:id', controller.getById); // Obtener venta por ID
router.post('/', controller.create); // Crear nueva venta
router.put('/:id', controller.update); // Actualizar venta existente
router.delete('/:id', controller.remove); // Eliminar venta por ID

module.exports = router;

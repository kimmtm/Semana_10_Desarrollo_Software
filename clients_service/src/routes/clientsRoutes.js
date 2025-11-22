const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientsControllers');

router.get('/', controller.getAll); // Obtener todos los clientes
router.get('/:id', controller.getById); // Obtener cliente por ID
router.post('/', controller.create); // Crear nuevo cliente
router.put('/:id', controller.update); // Actualizar cliente existente
router.delete('/:id', controller.remove); // Eliminar cliente por ID

module.exports = router;
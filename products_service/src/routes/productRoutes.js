const express = require('express');
const router = express.Router();
const controller = require('../controllers/productControllers');

router.get('/', controller.getProducts); // Obtener todos los productos
router.get('/:id', controller.getProductById); // Obtener producto por ID
router.post('/', controller.createProduct); // Crear nuevo producto
router.put('/update-stock', controller.updateStock); // Actualizar stock de productos

module.exports = router;

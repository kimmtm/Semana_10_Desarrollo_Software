const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.post('/', controller.createProduct);
router.put('/update-stock', controller.updateStock);

module.exports = router;

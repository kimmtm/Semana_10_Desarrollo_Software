const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

// Obtener todos los productos
router.get("/", productController.getAllProducts);

// Crear producto
router.post("/", productController.createProduct);

// Actualizar un producto
router.put("/:id", productController.updateProduct);

// Actualizar stock (si quieres una ruta específica)
router.patch("/:id/stock", productController.updateStock);

// Eliminar producto
router.delete("/:id", productController.deleteProduct);

module.exports = router;

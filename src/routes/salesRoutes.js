const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController.js");

// Obtener todas las ventas
router.get("/", salesController.getAllSales);

// Registrar nueva venta
router.post("/", salesController.createSale);

module.exports = router;

const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController.js");

// Obtener todos los clientes
router.get("/", clientController.getAllClients);

// Crear un cliente
router.post("/", clientController.createClient);

// Actualizar un cliente
router.put("/:id", clientController.updateClient);

// Eliminar un cliente
router.delete("/:id", clientController.deleteClient);

module.exports = router;

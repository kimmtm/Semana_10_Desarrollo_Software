import * as service from "../services/productService.js";

export const getProducts = (req, res) => {
    res.json(service.getProducts());
};

export const createProduct = (req, res) => {
    const result = service.createProduct(req.body);
    res.json(result);
};

export const updateProduct = (req, res) => {
    const updated = service.updateProduct(req.params.id, req.body);
    updated
    ? res.json(updated)
    : res.status(404).json({ message: "Producto no encontrado" });
};

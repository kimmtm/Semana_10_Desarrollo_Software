import * as service from "../services/salesService.js";

export const createSale = (req, res) => {
    try {
    const sale = service.createSale(req.body);
    res.json(sale);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
};

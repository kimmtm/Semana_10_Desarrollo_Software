import * as service from "../services/clientService.js";

export const getClients = (req, res) => {
    res.json(service.getClients());
};

export const createClient = (req, res) => {
    const result = service.createClient(req.body);
    res.json(result);
};

export const updateClient = (req, res) => {
    const updated = service.updateClient(req.params.id, req.body);
    updated
    ? res.json(updated)
    : res.status(404).json({ message: "Cliente no encontrado" });
};

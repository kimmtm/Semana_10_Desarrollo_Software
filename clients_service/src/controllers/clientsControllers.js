const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePath = path.join(__dirname, '../data/clients.json');

// Funciones auxiliares para leer y escribir datos
function readData() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]', 'utf8');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

exports.getAll = (req, res) => {
    const clients = readData();
    res.json(clients);
};

exports.getById = (req, res) => {
    const clients = readData();
    const c = clients.find(x => x.id === req.params.id);
    if (!c) return res.status(404).json({ error: 'Client not found' });
    res.json(c);
};

exports.create = (req, res) => {
    const clients = readData();
    const newClient = { id: uuidv4(), ...req.body };
    clients.push(newClient);
    writeData(clients);
    res.status(201).json(newClient);
};

exports.update = (req, res) => {
    const clients = readData();
    const idx = clients.findIndex(x => x.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Client not found' });
    clients[idx] = { ...clients[idx], ...req.body };
    writeData(clients);
    res.json(clients[idx]);
};

exports.remove = (req, res) => {
    let clients = readData();
    const before = clients.length;
    clients = clients.filter(x => x.id !== req.params.id);
    if (clients.length === before) return res.status(404).json({ error: 'Client not found' });
    writeData(clients);
    res.json({ message: 'Deleted' });
};

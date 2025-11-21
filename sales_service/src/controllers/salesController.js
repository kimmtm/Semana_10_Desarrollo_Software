const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data/sales.json');

function readData() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAll = (req, res) => {
    const sales = readData();
    res.json(sales);
};

exports.getById = (req, res) => {
    const sales = readData();
    const sale = sales.find(s => s.id === req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(sale);
};

exports.create = async (req, res) => {
    const sales = readData();

    const newSale = {
    id: uuidv4(),
    clientId: req.body.clientId,
    productId: req.body.productId,
    quantity: req.body.quantity || 1,
    total: req.body.total || 0,
    createdAt: new Date().toISOString()
    };

    sales.push(newSale);
    writeData(sales);

    res.status(201).json(newSale);
};

exports.update = (req, res) => {
    const sales = readData();
    const index = sales.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Sale not found' });

    sales[index] = { ...sales[index], ...req.body };
    writeData(sales);

    res.json(sales[index]);
};

exports.remove = (req, res) => {
    let sales = readData();
    const before = sales.length;

    sales = sales.filter(s => s.id !== req.params.id);
    if (sales.length === before)
    return res.status(404).json({ error: 'Sale not found' });

    writeData(sales);
    res.json({ message: 'Deleted' });
};

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios'); // Agrega axios para llamadas HTTP

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

// Crear una nueva venta
exports.create = async (req, res) => {
    console.log('[SalesController] Create sale request:', req.body);

    const sales = readData();

    const { clientId, products } = req.body; // products: [{ productId, quantity }]
    if (!clientId || !Array.isArray(products) || products.length === 0) {
        console.log('[SalesController] Missing clientId or products');
        return res.status(400).json({ error: 'clientId and products are required' });
    }

    // 1. Validar cliente
    try {
        console.log(`[SalesController] Validating clientId: ${clientId}`);
        const clientResp = await axios.get(`http://clients_service:3001/clients/${clientId}`);
        if (!clientResp.data) throw new Error('Client not found');
        console.log('[SalesController] Client validated:', clientResp.data);
    } catch (err) {
        console.error('[SalesController] Client validation error:', err.message);
        return res.status(400).json({ error: 'Invalid clientId' });
    }

    let subtotal = 0;
    let items = [];

    // 2. Validar productos y stock
    for (const item of products) {
        try {
            console.log(`[SalesController] Validating productId: ${item.productId}, quantity: ${item.quantity}`);
            const prodResp = await axios.get(`http://products_service:4000/products/${item.productId}`);
            const product = prodResp.data;
            if (!product) throw new Error('Product not found');
            if (product.stock < item.quantity) {
                console.warn(`[SalesController] Insufficient stock for product ${item.productId}`);
                return res.status(400).json({ error: `Insufficient stock for product ${item.productId}` });
            }
            // 3. Calcular subtotal
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            items.push({
                productId: item.productId,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                total: itemTotal
            });
            console.log(`[SalesController] Product validated: ${product.name}, subtotal: ${subtotal}`);
        } catch (err) {
            console.error(`[SalesController] Error with product ${item.productId}:`, err.message);
            return res.status(400).json({ error: `Error with product ${item.productId}` });
        }
    }

    // 4. Calcular impuestos y total (ejemplo: 16% IVA)
    const tax = subtotal * 0.16;
    const total = subtotal + tax;
    console.log(`[SalesController] Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`);

    // 5. Registrar venta
    const newSale = {
        id: uuidv4(),
        clientId,
        items,
        subtotal,
        tax,
        total,
        createdAt: new Date().toISOString()
    };
    sales.push(newSale);
    writeData(sales);
    console.log('[SalesController] Sale registered:', newSale);

    // 6. Descontar inventario
    for (const item of products) {
        try {
            console.log(`[SalesController] Decrementing stock for productId: ${item.productId}, quantity: ${item.quantity}`);
            await axios.patch(`http://products_service:4000/products/${item.productId}/decrement`, {
                quantity: item.quantity
            });
            console.log(`[SalesController] Stock decremented for productId: ${item.productId}`);
        } catch (err) {
            console.error(`[SalesController] Error decrementing stock for productId: ${item.productId}:`, err.message);
        }
    }

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

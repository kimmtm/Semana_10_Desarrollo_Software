const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

function loadProducts() {
    return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
}

function saveProducts(data) {
    fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
}

exports.getProducts = (req, res) => {
    const products = loadProducts();
    res.json(products);
};

exports.getProductById = (req, res) => {
    const products = loadProducts();
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
};

exports.createProduct = (req, res) => {
    const products = loadProducts();
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock ?? 0
    };

    products.push(newProduct);
    saveProducts(products);

    res.status(201).json(newProduct);
};

exports.updateStock = (req, res) => {
    const { productId, quantity } = req.body;

    const products = loadProducts();
    const product = products.find(p => p.id === Number(productId));

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity)
        return res.status(400).json({ message: "Not enough stock" });

    product.stock -= quantity;

    saveProducts(products);

    res.json({ message: "Stock updated", product });
};

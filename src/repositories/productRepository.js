import { readFileSync, writeFileSync } from "fs";

const file = "src/data/products.json";

const load = () => JSON.parse(readFileSync(file));
const save = (data) => writeFileSync(file, JSON.stringify(data, null, 2));

export const getProducts = () => load();

export const createProduct = (product) => {
    const data = load();
    product.id = Date.now();
    data.push(product);
    save(data);
    return product;
};

export const updateProduct = (id, body) => {
    const data = load();
    const index = data.findIndex((p) => p.id == id);

    if (index === -1) return null;

    data[index] = { ...data[index], ...body };
    save(data);

    return data[index];
};

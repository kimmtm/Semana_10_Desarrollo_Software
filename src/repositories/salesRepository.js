import { readFileSync, writeFileSync } from "fs";

const productsFile = "src/data/products.json";
const salesFile = "src/data/sales.json";

const load = (f) => JSON.parse(readFileSync(f));
const save = (f, data) => writeFileSync(f, JSON.stringify(data, null, 2));

export const createSale = ({ clientId, products }) => {
  const productsData = load(productsFile);
  const salesData = load(salesFile);

  let total = 0;

  for (const p of products) {
    const product = productsData.find(x => x.id == p.id);

    if (!product) throw new Error(`Producto no existe: ${p.id}`);
    if (product.stock < p.qty) throw new Error(`Stock insuficiente para ${product.name}`);

    total += product.price * p.qty;
    product.stock -= p.qty;
  }

  save(productsFile, productsData);

  const newSale = {
    id: Date.now(),
    clientId,
    products,
    total,
    date: new Date().toISOString()
  };

  salesData.push(newSale);
  save(salesFile, salesData);

  return newSale;
};

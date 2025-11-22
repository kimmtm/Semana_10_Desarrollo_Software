import * as repo from "../repositories/productRepository.js";

export const getProducts = () => repo.getProducts();
export const createProduct = (data) => repo.createProduct(data);
export const updateProduct = (id, data) => repo.updateProduct(id, data);

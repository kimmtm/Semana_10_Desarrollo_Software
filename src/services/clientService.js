import * as repo from "../repositories/clientRepository.js";

export const getClients = () => repo.getClients();
export const createClient = (data) => repo.createClient(data);
export const updateClient = (id, data) => repo.updateClient(id, data);

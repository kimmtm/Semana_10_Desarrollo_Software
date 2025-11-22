import { readFileSync, writeFileSync } from "fs";

const file = "src/data/clients.json";

const load = () => JSON.parse(readFileSync(file));
const save = (data) => writeFileSync(file, JSON.stringify(data, null, 2));

export const getClients = () => load();

export const createClient = (client) => {
    const data = load();
    client.id = Date.now();
    data.push(client);
    save(data);
    return client;
};

export const updateClient = (id, body) => {
    const data = load();
    const index = data.findIndex((c) => c.id == id);

    if (index === -1) return null;

    data[index] = { ...data[index], ...body };
    save(data);

    return data[index];
};

const express = require("express");
const clientRoutes = require("./routes/clientRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const salesRoutes = require("./routes/salesRoutes.js");

const app = express();
app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/products", productRoutes);
app.use("/sales", salesRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000...");
});

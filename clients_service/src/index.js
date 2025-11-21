const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientsRoutes = require('./routes/clientsRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/clients', clientsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`clients-service running on ${PORT}`));
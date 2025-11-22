const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`sales-service running on port ${PORT}`));

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/clients', createProxyMiddleware({ target: 'http://clients-service:3001', changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: 'http://products-service:4000', changeOrigin: true }));
app.use('/sales', createProxyMiddleware({ target: 'http://sales-service:3003', changeOrigin: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on ${PORT}`));

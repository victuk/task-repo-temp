const express = require("express");

const app = express();
const port = 3005;

app.use(express.json());

let products = []; // In-memory products array
let nextId = 1;

// GET all products
app.get('/products', (req, res) => {
    res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// POST new product
app.post('/products', (req, res) => {
    const { name, price, stockStatus } = req.body;
    if (!name || !price || !stockStatus) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const product = {
        id: nextId++,
        name,
        price,
        stockStatus // e.g., 'in-stock' or 'out-of-stock'
    };
    products.push(product);
    res.status(201).json(product);
});

// PATCH edit product (except stock status)
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, price } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;

    res.json(product);
});

// PATCH change only stock status
app.patch('/products/:id/:status', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const validStatuses = ['in-stock', 'out-of-stock'];
    const { status } = req.params;

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid stock status' });
    }

    product.stockStatus = status;
    res.json(product);
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    const deleted = products.splice(index, 1);
    res.json({ message: 'Product deleted', product: deleted[0] });
});

app.listen(port, () => {
  console.log(`Provision API running at http://localhost:${port}`);
});
const express = require("express");
const app = express();
const port = 3005;
const {v4: uuidv4} = require("uuid");

let products = [];


app.use(express.json());

const validStatuses = ["in-stock", "low-stock", "out-of-stock"];

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function getProducts(req, res) {
  res.json(products);
}

function getProductById(req, res) {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
}

function addProduct(req, res) {
  const { productName, cost, stockStatus } = req.body;

  if (!validStatuses.includes(stockStatus)) {
    return res.status(400).json({ error: "Invalid stock status" });
  }

  const newProduct = {
    id: generateId(),
    productName,
    cost,
    stockStatus,
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
}

function editProduct(req, res) {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { productName, cost } = req.body;

  if (productName !== undefined) product.productName = productName;
  if (cost !== undefined) product.cost = cost;

  res.json(product);
}

function updateStockStatus(req, res) {
  const id = parseInt(req.params.id);
  const newStatus = req.params.status;

  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ error: "Invalid stock status" });
  }

  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  product.stockStatus = newStatus;
  res.json(product);
}

function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
}


app.get("/products", getProducts);
app.get("/products/:id", getProductById);
app.post("/products", addProduct);
app.patch("/products/:id", editProduct);
app.patch("/products/:id/:status", updateStockStatus);
app.delete("/products/:id", deleteProduct);

app.listen(port, () => {
  console.log(`Provision API running at http://localhost:${port}`);
});
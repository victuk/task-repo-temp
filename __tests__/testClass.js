class ProvisionStore {
  #shopName;
  #location;

  constructor(shopName, location) {
    this.#shopName = shopName;
    this.#location = location;
    this.products = [];
  }

  generateId() {
    return Math.floor(Math.random() * 100000);
  }

  addProduct(productName, cost, stockStatus) {
    const allowedStatus = ["in-stock", "low-stock", "out-of-stock"];
    if (!allowedStatus.includes(stockStatus)) {
      throw new Error("Invalid stock status");
    }

    const product = {
      id: this.generateId(),
      productName,
      cost,
      stockStatus,
      createdAt: new Date()
    };

    this.products.push(product);
    return product;
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return this.products[i];
      }
    }
    console.log("Product not found");
    return null;
  }

  deleteProductById(id) {
    const newProducts = [];
    let deletedProduct = null;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id !== id) {
        newProducts.push(this.products[i]);
      } else {
        deletedProduct = this.products[i];
      }
    }

    this.products = newProducts;
    return deletedProduct;
  }

  editProduct(id, updatedFields) {
    const product = this.getProductById(id);
    if (!product) {
      console.log("Product not found");
      return null;
    }

    if (updatedFields.productName !== undefined) {
      product.productName = updatedFields.productName;
    }

    if (updatedFields.cost !== undefined) {
      product.cost = updatedFields.cost;
    }

    return product;
  }

  updateStockStatus(id, newStatus) {
    if (!["in-stock", "low-stock", "out-of-stock"].includes(newStatus)) {
      console.log("Invalid stock status");
      return null;
    }

    let product = null;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        product = this.products[i];
        product.stockStatus = newStatus;
        break;
      }
    }

    if (!product) {
      console.log("Product not found");
      return null;
    }

    return product;
  }
}



// Example usage:
const p = new ProvisionStore("Ud's Store", "Lagos");

console.log("First list", p.getAllProducts());

p.addProduct("Hair", 2000, "in-stock");

// const pDetails = p.products[0];
const pDetails = p.getAllProducts()[0];

console.log("List after adding a product", p.getAllProducts());

p.editProduct(pDetails.id, {productName: "Edted product name", cost: 40000});

console.log("List after updating product cost", p.getAllProducts());

p.updateStockStatus(pDetails.id, "low-stock");

console.log("List after updating product stock status", p.getAllProducts());

p.deleteProductById(pDetails.id);

console.log("List after deleting a product", p.getAllProducts());

module.exports = ProvisionStore;

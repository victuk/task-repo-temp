class ProvisionStore {
    #shopName;
    #location;
  
    products = [];
  
    constructor(shopName, location) {
      this.#shopName = shopName;
      this.#location = location;
      this.products = [];
    }
  
    //  Get the  shop name
    getShopName() {
      return this.#shopName;
    }
  
    //  Get the shop location
    getLocation() {
      return this.#location;
    }
  
    updateLocation(newLocation) {
      if (!newLocation || typeof newLocation !== "string") {
        return {
          success: false,
          message: "invalide location",
        };
      }
      this.#location = newLocation;
      return {
        success: true,
        message: "shop location updated successfully",
      };
    }
  
    // Return the list of products
    listProducts() {
      return this.products;
    }
  
    // Get product by ID
    getProductById(id) {
      return this.products.find((p) => p.id === id) || null;
    }
  
    // Add a new product
    addProduct({ productName, cost, stockStatus }) {
      const validStatus = ["in-stock", "low-stock", "out-of-stock"];
      const normalized = stockStatus.toLowerCase();
      if (!validStatus.includes(normalized)) {
        return {
          success: false,
          message:
            "Invalid stock status. Use in-stock, low-stock, or out-of-stock.",
        };
      }
  
      const newProduct = {
        productName,
        cost: parseFloat(cost.toString().replace(/,/g, "")),
        stockStatus: normalized,
        createdAt: new Date().toISOString(),
        id: Math.floor(Math.random() * 100000),
      };
      this.products.push(newProduct);
      return {
        success: true,
        message: "product added successfully",
        newProduct,
      };
    }
  
    // Edit a product by ID
    editProductById(id, newValues) {
      const product = this.getProductById(id);
      if (!product) {
        return {
          success: false,
          message: "product not found",
        };
      }
  
      if (newValues.productName) product.productName = newValues.productName;
      if (newValues.cost)
        product.cost = parseFloat(newValues.cost.toString().replace(/,/g, ""));
      return {
        success: true,
        message: "product edited successfully",
        data: product,
      };
    }
  
    // Update stock status by ID
    updateStockStatus(id, newStatus) {
      const product = this.getProductById(id);
      if (!product) {
        return {
          success: false,
          message: "product not found",
        };
      }
  
      const validStatus = ["in-stock", "low-stock", "out-of-stock"];
      const normalized = newStatus.toLowerCase();
      if (!validStatus.includes(normalized)) {
        return {
          success: false,
          message:
            "Invalid stock status. Use in-stock, low-stock, or out-of-stock.",
        };
      }
  
      product.stockStatus = normalized;
      return {
        success: true,
        message: "stock updated successfully",
        data: product,
      };
    }
  
    // Delete product by ID
    deleteProductById(id) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        return {
          success: false,
          message: "product not found",
        };
      }
      const deleted = this.products.splice(index, 1)[0];
      return {
        success: true,
        message: "product deleted successfully",
        data: deleted,
      };
    }
  }



// Example usage:
const p = new ProvisionStore("Ud's Store", "Lagos");

console.log("First list", p.listProducts());

p.addProduct({productName: "Hair", cost: 2000, stockStatus: "in-stock"});

// const pDetails = p.products[0];
const pDetails = p.listProducts()[0];

console.log("List after adding a product", p.listProducts());

p.editProductById(pDetails.id, {productName: "Edted product name", cost: 40000});

console.log("List after updating product cost", p.listProducts());

p.updateStockStatus(pDetails.id, "low-stock");

console.log("List after updating product stock status", p.listProducts());

p.deleteProductById(pDetails.id);

console.log("List after deleting a product", p.listProducts());

module.exports = ProvisionStore;

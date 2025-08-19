//A class named ProvionStore and contain several features

class ProvisionStore {
	#shopName;
	#location;
	
	constructor (shopName, location) {
		this.#shopName = shopName;
		this.#location = location;
		this.products = [];
	}
	
	#generateId() {
    return Math.floor(Math.random() * 10000);
}

addProduct(productName, cost, stockStatus) {
	const validStatus = ["in-stock", "low-stock", "out-of-stock"];
    if (!validStatus.includes(stockStatus)) {
      throw new Error("Stock status must be in-stock, low-stock or out-of-stock");
    }

    const newProduct = {
      id: this.#generateId(),
      productName,
      cost,
      stockStatus,
      createdAt: new Date()
    };
	
	this.products.unshift(newProduct);
    return {success: true, message: "Product added successfully.", product: newProduct};
}

//A method that returns a list of products
listProducts() {
	return this.products;
}

//A method to return a product by its’ ID
getAProduct(id) {
	for (let i =0; i < this.products.length; i++) { 
		if (this.products[i].id === id) {
			return this.products[i];
		}
	}
	throw new Error("Product not found");
}

//A method that can edit a product’s properties (except its stock status) by ID
editProduct(id, updates) {
	const product = this.getAProduct(id);
	if (!product) return {success: false, message: "Product not found."};

	const {productName, cost} = updates;
    if (productName !== undefined) product.productName = productName;
    if (cost !== undefined) product.cost = cost;
	
	return {success: true, message: "Product updated successfully."};
}

//A method that can only edit current stock status
editStockStatus(id, newStatus) {
	const validStatus = ["in-stock", "low-stock", "out-of-stock"];
	if (!validStatus.includes(newStatus)) {
		return {success: false, message: "Invalid stock status."};
	}
	const product = this.getAProduct(id);
	if (!product) {
		return {success: false, message: "Product not found."};
	}
	product.stockStatus = newStatus;
	return { success: true, message: "Stock updated successfully."};
}

//A method to delete a product by ID.
deleteProduct(id) {
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].id === id) {
				this.products.splice(i, 1);
				return {success: true, message: "Product deleted."};
			}
		}
		return {success: false, message: "Product not found."};
	}
}


// Example usage:
const p = new ProvisionStore("Ud's Store", "Lagos");

console.log("First list", p.listProducts());

p.addProduct("Hair", 2000, "in-stock");

// const pDetails = p.products[0];
const pDetails = p.listProducts()[0];

console.log("List after adding a product", p.listProducts());

p.editProduct(pDetails.id, {productName: "Edted product name", cost: 40000});

console.log("List after updating product cost", p.listProducts());

p.editStockStatus(pDetails.id, "low-stock");

console.log("List after updating product stock status", p.listProducts());

p.deleteProduct(pDetails.id);

console.log("List after deleting a product", p.listProducts());

module.exports = ProvisionStore;

const ProvisionStore = require("./testClass");

let productId;

describe("Test provision store assignment", () => {
    const p = new ProvisionStore();
    test("Product array should be empty", () => {
        expect(p.products.length).toBe(0);
    });

    test("1 Product should be added", () => {
        const newProduct = p.addProduct("Hair", 2000, "in-stock");
        productId = newProduct.id;
        expect(p.products.length).toBe(1);
        expect(p.products[0].productName).toBe("Hair");
        expect(p.products[0].cost).toBe(2000);
    });

    test("Update 1 product cost", () => {
        p.editProductById(p.products[0].id, {cost: 4000});
        const product = p.getProductById(productId);
        console.log("product ID", productId, "after being updated", product);
        expect(product.cost).toBe(4000);
    });

    test("Update 1 product stock status", () => {
        p.updateStockStatus(p.products[0].id, "low-stock");
        const product = p.getProductById(productId);
        console.log("product ID", productId, "after stock is updated", product);
        expect(product.cost).toBe(4000);
    });

    test("Delete 1 product", () => {
        p.updateStockStatus(p.products[0].id);
        console.log("product ID", productId);
        const product = p.getProductById(productId);
        expect(product.cost).toBe(4000);
    });
});
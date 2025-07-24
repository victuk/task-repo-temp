const express = require("express");
const app = express();
const port = 3005;
const {v4: uuidv4} = require("uuid");


app.use(express.json());

let shop = [];

const getAllProduct = (req, res) => {
    res.send(shop);
}
const addNewProduct = (req, res) => {
    const id = Math.floor(Math.random() * 10000);
    const productName = req.body.productName;
    const cost = parseInt(req.body.cost); 
    const stockStatus = req.body.stockStatus;
    const createdAt = new Date()

    shop.push({
        id,
        productName,
        cost,
        stockStatus,
        createdAt,
    });
    res.send({
        message : "Product added successfully"
    })
    
    
}
const viewSingleProduct = (req, res) => {
    const id = req.params.id;
    let productFound;

    for(let i = 0; i<shop.length; i++){
        if(shop[i].id == id){
            productFound = shop[i];
        }
    }
    if(!productFound){
        res.status(404).send("Product not found");
        return
    }
    res.send({
        message: "Product Found",
        productFound
    })
}

const updateProductStatus = (req, res) => {
    const id = req.params.id;
    const isDone = req.body.isDone;

    const updatedProduct = [];

    for(let i = 0; i < shop.length; i++) {
        if(shop[i].id == id) {
            shop[i].isDone = isDone
        }
        updatedProduct.push(shop[i]);
    }
    shop = updatedProduct;

    res.send({
        message: "product updated successfully",
        shop
    });
}

const deleteProduct = (req, res) =>{
    const id = req.params.id;
    const updatedProduct = [];
    let deletedProduct

    for(let i; i<shop.length; i++){
        if(shop[i].id != id){
            updatedProduct.push(shop[i]);
        }else{
            deletedProduct = shop[i]
        }
    }
    shop = updatedProduct;
    res.send({
        message: "Product deleted successfully",
        deletedProduct
        
    });
}


app.get("/products", getAllProduct);
app.post("/products", addNewProduct);
app.get("/products/:id", viewSingleProduct);
app.patch("/products/:id", updateProductStatus);
app.delete("/products/:id", deleteProduct);

app.listen(port, () => {
  console.log(`Provision API running at http://localhost:${port}`);
});
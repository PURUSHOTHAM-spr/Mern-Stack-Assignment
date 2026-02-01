import exp from "express";
// create a mini-express productApp
export const productApp = exp.Router();

// product array
let products = [];
// read product data
productApp.get('/products', (req, res) => {
    res.status(200).json({ message: "all products", payload: products })
})

// get the object using brand id
productApp.get("/products-id/:id", (req, res) => {
    let id = Number(req.params.id);
    let reqObjs = products.findIndex(prod => prod.productId === id);
    if (reqObjs != -1) {
        let objs = products[reqObjs]
        res.json({ message: "product found", objs });
    } else {
        res.json({ message: "product not found" });
    }

})

// get the object using brand name
productApp.get("/products-name/:name", (req, res) => {
    let name = req.params.name;
    let reqObjs = products.find(prod => prod.name === name);
    res.json({ message: "product found", reqObjs });
})

// push into the array
productApp.post('/products', (req, res) => {
    let newProduct = req.body;
    products.push(newProduct)
    res.json({ message: "product added successfully", payload: products });
})


// edit the array
productApp.put('/products/:id', (req, res) => {
    let reqProduct = Number(req.params.id);
    let reqProductIdx = products.findIndex(prods => prods.id === reqProduct);
    let updatedProd = products.splice(reqProductIdx, 1, req.body);
    res.json({ message: "Product edited", payload: products });
})
// delete the object from the array
productApp.delete('/products/:id', (req, res) => {
    let id = Number(req.params.id);
    let reqProductIdx = products.findIndex(prods => prods.id === id);
    let updatedProd = products.splice(reqProductIdx, 1);
    res.json({ message: "Product edited", payload: products });
})
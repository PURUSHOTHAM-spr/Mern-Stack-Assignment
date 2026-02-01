// import express
import express from "express";

// create app
const app = express();

// middleware
app.use(express.json());

// in-memory data
let users = [];
let products = [];

// start server
app.listen(3000, () => {
  console.log("HTTP Server is listening on port 3000..");
});


//USERS API 

// GET all users
app.get("/users", (req, res) => {
  res.status(200).json({ message: "all users", payload: users });
});

// POST create user
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  res.status(201).json({
    message: "user created",
    payload: newUser
  });
});

// GET user by id
app.get("/users/:id", (req, res) => {
  const userid = Number(req.params.id);
  const user = users.find(u => u.id === userid);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ message: "user found", payload: user });
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const userid = Number(req.params.id);
  const updatedData = req.body;

  const index = users.findIndex(u => u.id === userid);

  if (index === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  users[index] = { ...users[index], ...updatedData, id: userid };

  res.status(200).json({
    message: "user modified",
    payload: users[index]
  });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const userid = Number(req.params.id);

  const index = users.findIndex(u => u.id === userid);
  if (index === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  const deletedUser = users.splice(index, 1)[0];

  res.status(200).json({
    message: "user deleted",
    payload: deletedUser
  });
});


//-------- PRODUCTS API --------

// GET all products
app.get("/products", (req, res) => {
  res.status(200).json({ message: "all products", payload: products });
});

// POST create product
app.post("/products", (req, res) => {
  const product = req.body;
  products.push(product);

  res.status(201).json({
    message: "product created",
    payload: product
  });
});

// GET product by id
app.get("/products/:id", (req, res) => {
  const productid = Number(req.params.id);

  const product = products.find(p => p["product-id"] === productid);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  res.status(200).json({ message: "product found", payload: product });
});

// Put update product
app.put("/products/:id", (req, res) => {
  const productid = Number(req.params.id);
  const updatedProduct = req.body;

  const index = products.findIndex(p => p["product-id"] === productid);
  if (index === -1) {
    return res.status(404).json({ message: "product not found" });
  }

  products[index] = { ...updatedProduct, "product-id": productid };

  res.status(200).json({
    message: "product modified",
    payload: products[index]
  });
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const productid = Number(req.params.id);

  const index = products.findIndex(p => p["product-id"] === productid);
  if (index === -1) {
    return res.status(404).json({ message: "product not found" });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.status(200).json({
    message: "product deleted",
    payload: deletedProduct
  });
});

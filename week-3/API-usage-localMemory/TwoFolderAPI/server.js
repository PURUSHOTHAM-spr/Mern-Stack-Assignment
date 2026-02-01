import exp from "express";
import { productApp } from "./ProductAPI.js";
import { userApp } from "./UserAPI.js";

// create HTTP server
const app = exp();
// assign the port number
app.listen(3000,() => console.log('HTTP server listening on port 3000'));

// body parsing middleware
app.use(exp.json());

// forward req to userApp when path starts with '/user-api/
app.use('/user-api',userApp);


// forward req to productApp when path starts with '/product-api/
app.use('/product-api',productApp);
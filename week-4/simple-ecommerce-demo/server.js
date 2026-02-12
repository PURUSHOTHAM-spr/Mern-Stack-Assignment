
import exp from "express";
import { userApp } from "./API/userApi.js";
import { productApp } from "./API/productApi.js";
import { connect } from "mongoose";

// create HTTP server
const app = exp();
app.use(exp.json());

// connect to db
const connection = async () => {
    try {
let database= await connect("mongodb://127.0.0.1:27017/ecommerceDB");
//await is used to pause execution of an async function until a Promise settles (resolves or rejects).

        console.log("connection success");
        // Assign port 
        app.listen(3000, () => console.log("Sever is listening on port 3000"));
    } catch (err) {
        console.log("Err in connection", err);
    }
}
connection()


// If path starts with /user-api , forward req to userApp
app.use('/user-api', userApp);
// If path starts with /product-api , forward req to productApp
app.use('/product-api', productApp);

// error handling middleware(should always be placed at the end of server or anyfile)
app.use((err,req,res,next) => {
    res.status(500).json({message:"error occured",reason:err.message});
})
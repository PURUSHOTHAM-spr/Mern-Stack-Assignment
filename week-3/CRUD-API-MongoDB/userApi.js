import exp from "express";
import { userModel } from "./Models/userModel.js";
// create a mini-express server
export const userApp = exp.Router();
// To read user data from db
userApp.get("/users", async (req, res) => {
// read users from db
let usersList = await userModel.find({})
res.json({ message: "Users data retreived successfully", usersList })
})

// post data to db
userApp.post("/users", async (req, res) => {
// get new users from req
let newUser = req.body;
let newUserDoc = new userModel(newUser);
//save in db
await newUserDoc.save()
res.json({ message: "user created successfully" })
})

// read user by object id
userApp.get("/users/:id", async (req, res) => {
let id = req.params.id;
// find user in db
let user = await userModel.findById(id);
res.json({ message: "user found", user })
})

// update user
userApp.put("/users/:id",async(req,res) => {
let id = req.params.id;
let updatedUser = req.body;
let user = await userModel.findByIdAndUpdate(id, { $set: { ...updatedUser }},{new:true,runValidators:true});
res.json({message: "user updated", user })
})

// delete user
userApp.delete("/users/:id",async(req,res)=> {
let id = req.params.id;
let deletedUser = await userModel.findByIdAndDelete(id);
res.json({message: "user deleted", deletedUser });
})
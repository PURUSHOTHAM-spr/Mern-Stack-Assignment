import exp from "express";
import { UserModel } from "../models/UserModel.js";
export const UserApp = exp.Router();

// Create User
UserApp.post("/users", async (req, res, next) => {
  try {
    const newUser = req.body;
    const newUserDocument = new UserModel(newUser);
    let user = await newUserDocument.save();
    res.status(201).json({ message: "User created", payload: user });
  } catch (err) {
    next(err);
  }
});

// Read all active Users
UserApp.get("/users", async (req, res, next) => {
  try {
    let usersList = await UserModel.find({ status: true });
    res.status(200).json({ message: "users", payload: usersList });
  } catch (err) {
    next(err);
  }
});

// Read a User by ID
UserApp.get("/users/:id", async (req, res, next) => {
  try {
    let uid = req.params.id;
    let user = await UserModel.findOne({ _id: uid, status: true });
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "user found", payload: user });
  } catch (err) {
    next(err);
  }
});

// Soft Delete a User
UserApp.delete("/users/:id", async (req, res, next) => {
  try {
    let uid = req.params.id;
    let user = await UserModel.findByIdAndUpdate(uid, { $set: { status: false } }, { new: true });
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "User removed" });
  } catch (err) {
    next(err);
  }
});

// Activate User
UserApp.patch("/users/:id", async (req, res, next) => {
  try {
    let uid = req.params.id;
    let user = await UserModel.findByIdAndUpdate(uid, { $set: { status: true } }, { new: true });
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "User activated", payload: user });
  } catch (err) {
    next(err);
  }
});
import express from "express";
import { authenticate } from "../services/authServices.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { UserTypeModel } from "../Models/UserModel.js";


//role based verification
const checkAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied: Admin only" });
    }
    next();
};


export const adminRoute = express.Router();
//authenticate(public)
adminRoute.post("/authenticate", async (req, res, next) => {
  try {
    const result = await authenticate(req.body);

    res.status(200).json({message: "Admin login success",payload: result,});
  } catch (err) {
    next(err);
  }
});


//read articles(private)
adminRoute.get( "/articles/author/:authorId",verifyToken,checkAdmin,async (req, res) => {
    try {
      const authorId = req.params.authorId;

      const articles = await ArticleModel.find({
        author: authorId,
        isArticleActive: true,}).populate("author", "firstname lastname");

      res.status(200).json({message: "Author articles fetched successfully",payload: articles, });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
//block or unblock
// block user or author (admin only)
adminRoute.put(
  "/users/block/:userId",verifyToken,checkAdmin,async (req, res) => {
    try {
      const userId = req.params.userId;

      const blockedUser = await UserTypeModel.findByIdAndUpdate(userId,{ isActive: false }, { new: true }
      );
      if (!blockedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({message: "User blocked successfully",payload: blockedUser,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
// unblock user or author (admin only)
adminRoute.put(
  "/users/unblock/:userId",verifyToken,checkAdmin,async (req, res) => {
    try {
      const userId = req.params.userId;
      const unblockedUser = await UserTypeModel.findByIdAndUpdate(
        userId,{ isActive: true },{ new: true });
      if (!unblockedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({message: "User unblocked successfully", payload: unblockedUser,});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);



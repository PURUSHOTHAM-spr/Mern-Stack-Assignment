import express from "express";
import { register } from "../services/authServices.js";
import { UserTypeModel } from "../Models/UserModel.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const userRoute = express.Router();

// register user(public)
userRoute.post("/users", async (req, res, next) => {
  try {
    const newUserObj = await register({ ...req.body, role: "USER" });

    res.status(201).json({message: "User created",payload: newUserObj,});
  } catch (err) {
    next(err);
  }
});

// get all users(protected)
userRoute.get("/users", verifyToken, async (req, res) => {
  try {
    const allusers = await UserTypeModel.find();

    res.status(200).json({message: "users fetched successfully",payload: allusers});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// read articles by author id(protected)
userRoute.get(
  "/articles/author/:authorId",
  verifyToken,
  async (req, res) => {
    try {
      const authorId = req.params.authorId;

      const articles = await ArticleModel.find({
        author: authorId,
        isArticleActive: true,
      }).populate("author", "firstname lastname");

      res.status(200).json({message: "Author articles fetched successfully",payload: articles,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// add comment(protected)
userRoute.post("/users/comments", verifyToken, async (req, res) => {
  try {
    const { articleId, comment } = req.body;

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $push: {comments: {user: req.user.userId,comment: comment},
        },
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(201).json({
      message: "Comment added successfully",
      payload: updatedArticle,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

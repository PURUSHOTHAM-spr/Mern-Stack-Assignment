import exp from "express";
import { register, authenticate } from "../services/authService.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const userRoute = exp.Router();

//Register user
userRoute.post("/users", async (req, res) => {
  //get user obj from req
  let userObj = req.body;
  //call register
  const newUserObj = await register({ ...userObj, role: "USER" });
  //send res
  res.status(201).json({ message: "user created", payload: newUserObj });
});

//Read all articles(protected route)
userRoute.get("/articles", verifyToken(["USER"]), async (req, res) => {
  //read articles of all authors which are active
  const articles = await ArticleModel.find({ isArticleActive: true });
  //send res
  res.status(200).json({ message: "all articles", payload: articles });
});

//Read single article by ID(protected route)
userRoute.get("/articles/:id", verifyToken(["USER", "AUTHOR"]), async (req, res) => {
  try {
    const article = await ArticleModel.findOne({ _id: req.params.id, isArticleActive: true }).populate("author", "firstName email");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "article", payload: article });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add comment to an article(protected route)
userRoute.put("/articles", verifyToken(["USER"]), async (req, res) => {
  //get comment obj from req
  const { user, articleId, comment } = req.body;
  //check user(req.user)
  console.log(req.user);
  if (user !== req.user.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  //find artcleby id and update
  let articleWithComment = await ArticleModel.findOneAndUpdate(
    { _id: articleId, isArticleActive: true },
    { $push: { comments: { user, comment } } },
    { new: true, runValidators: true },
  );

  //if article not found
  if (!articleWithComment) {
    return res.status(404).json({ message: "Article not found" });
  }
  //send res
  res.status(200).json({ message: "comment added successfully", payload: articleWithComment });
});
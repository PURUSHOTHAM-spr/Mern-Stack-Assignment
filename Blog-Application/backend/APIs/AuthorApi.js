import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../Models/ArticleModel.js";
//import { checkAuthor } from "../middlewares/checkAuthor.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const authorRoute = exp.Router();

//Register author(public)
authorRoute.post("/users", async (req, res) => {
  //get user obj from req
  let userObj = req.body;
  //call register
  const newUserObj = await register({ ...userObj, role: "AUTHOR" });
  //send res
  res.status(201).json({ message: "author created", payload: newUserObj });
});

//Create article(protected route)
authorRoute.post("/articles", verifyToken(["AUTHOR"]), async (req, res) => {
  //get article from req
  let article = req.body;

  //create article document
  let newArticleDoc = new ArticleModel(article);
  //save
  let createdArticleDoc = await newArticleDoc.save();
  //send res
  res.status(201).json({ message: "article created", payload: createdArticleDoc });
});

//Read artiles of author(protected route)
authorRoute.get("/articles", verifyToken(["AUTHOR"]), async (req, res) => {
  //get author id from token
  let aid = req.user.userId;

  //read atricles by this author which are acticve
  let articles = await ArticleModel.find({ author: aid, isArticleActive: true }).populate("author", "firstName email");
  //send res
  res.status(200).json({ message: "articles", payload: articles });
});

//edit article(protected route)
authorRoute.put("/articles", verifyToken(["AUTHOR"]), async (req, res) => {
  //get modified article from req
  let { articleId, title, category, content, author } = req.body;
  //find article
  let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: author });
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }

  //update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $set: { title, category, content },
    },
    { new: true },
  );
  //send res(updated article)
  res.status(200).json({ message: "article updated", payload: updatedArticle });
});

//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken(["AUTHOR"]), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && 
    article.author.toString() !== req.user.userId) {
    return res
    .status(403)
    .json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    article,
  });
});
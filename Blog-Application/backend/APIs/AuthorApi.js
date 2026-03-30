import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { UserTypeModel } from "../Models/UserModel.js";
//import { checkAuthor } from "../middlewares/checkAuthor.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

export const authorRoute = exp.Router();

//Register author(public)
authorRoute.post(
  "/users",
  upload.single("profilePic"),
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      let userObj = req.body;
      // Remove profilePic from body (handled by multer as file, not a schema field)
      delete userObj.profilePic;

      //  Step 1: upload image to cloudinary from memoryStorage (if exists)
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      // Step 2: call existing register()
      const newUserObj = await register({
        ...userObj,
        role: "AUTHOR",
        profileImageUrl: cloudinaryResult?.secure_url,
      });

      res.status(201).json({
        message: "author created",
        payload: newUserObj,
      });

    } catch (err) {

      // Step 3: rollback
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }

      next(err);
    }

  }
);

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

// Get Author Stats (protected route)
authorRoute.get("/stats", verifyToken(["AUTHOR"]), async (req, res) => {
  try {
    const authorId = req.user.userId;

    // 1. Get followers count
    const author = await UserTypeModel.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    const followersCount = author.followers ? author.followers.length : 0;

    // 2. Get posts count (active articles)
    const postsCount = await ArticleModel.countDocuments({ author: authorId, isArticleActive: true });

    // 3. Calculate average rating
    const articles = await ArticleModel.find({ author: authorId, isArticleActive: true });
    
    let totalRatings = 0;
    let ratingCount = 0;

    articles.forEach(article => {
      if (article.comments && article.comments.length > 0) {
        article.comments.forEach(comment => {
          if (comment.rating && typeof comment.rating === 'number') {
            totalRatings += comment.rating;
            ratingCount += 1;
          }
        });
      }
    });

    const averageRating = ratingCount > 0 ? (totalRatings / ratingCount).toFixed(1) : 0;

    res.status(200).json({
      message: "Stats retrieved successfully",
      payload: {
        followers: followersCount,
        posts: postsCount,
        rating: Number(averageRating)
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
import exp from "express";
import { register, authenticate } from "../services/authService.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { UserTypeModel } from "../Models/UserModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

export const userRoute = exp.Router();

//Register user
userRoute.post(
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
        role: "USER",
        profileImageUrl: cloudinaryResult?.secure_url,
      });

      res.status(201).json({
        message: "user created",
        payload: newUserObj,
      });

    } catch (err) {

      // Step 3: rollback
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }

      next(err); // send to your error middleware
    }

  }
);

//Read all articles(protected route)
userRoute.get("/articles", verifyToken(["USER"]), async (req, res) => {
  //read articles of all authors which are active
  const articles = await ArticleModel.find({ isArticleActive: true })
    .populate("author", "firstName lastName email profileImageUrl followers");
  //send res
  res.status(200).json({ message: "all articles", payload: articles });
});

//Read articles from followed authors(protected route)
userRoute.get("/articles/following", verifyToken(["USER", "AUTHOR"]), async (req, res) => {
  try {
    const userId = req.user.userId;
    // Find authors who have this userId in their followers array
    const followedAuthors = await UserTypeModel.find({ followers: userId }).select("_id");
    const authorIds = followedAuthors.map(author => author._id);

    const articles = await ArticleModel.find({ author: { $in: authorIds }, isArticleActive: true })
      .populate("author", "firstName lastName email profileImageUrl followers");

    res.status(200).json({ message: "followed articles", payload: articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Read single article by ID(protected route)
userRoute.get("/articles/:id", verifyToken(["USER", "AUTHOR"]), async (req, res) => {
  try {
    const article = await ArticleModel.findOne({ _id: req.params.id, isArticleActive: true })
      .populate("author", "firstName email profileImageUrl followers")
      .populate("comments.user", "firstName lastName profileImageUrl");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "article", payload: article });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add comment to an article(protected route)
userRoute.put("/articles", verifyToken(["USER", "AUTHOR"]), async (req, res) => {
  //get comment obj from req
  const { user, articleId, comment, rating } = req.body;
  //check user(req.user)
  if (user !== req.user.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  //find artcleby id and update
  let articleWithComment = await ArticleModel.findOneAndUpdate(
    { _id: articleId, isArticleActive: true },
    { $push: { comments: { user, comment, rating } } },
    { new: true, runValidators: true },
  )
    .populate("author", "firstName email profileImageUrl followers")
    .populate("comments.user", "firstName lastName profileImageUrl");

  //if article not found
  if (!articleWithComment) {
    return res.status(404).json({ message: "Article not found" });
  }
  //send res
  res.status(200).json({ message: "comment added successfully", payload: articleWithComment });
});

//Follow an author
userRoute.put("/users/:id/follow", verifyToken(["USER", "AUTHOR"]), async (req, res) => {
  try {
    const authorId = req.params.id;
    const userId = req.user.userId;

    if (authorId === userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const author = await UserTypeModel.findByIdAndUpdate(
      authorId,
      { $addToSet: { followers: userId } },
      { new: true }
    );

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Successfully followed author", followersCount: author.followers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Unfollow an author
userRoute.put("/users/:id/unfollow", verifyToken(["USER", "AUTHOR"]), async (req, res) => {
  try {
    const authorId = req.params.id;
    const userId = req.user.userId;

    const author = await UserTypeModel.findByIdAndUpdate(
      authorId,
      { $pull: { followers: userId } },
      { new: true }
    );

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Successfully unfollowed author", followersCount: author.followers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
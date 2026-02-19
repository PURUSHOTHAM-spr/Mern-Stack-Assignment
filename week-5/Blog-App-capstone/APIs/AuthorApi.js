import exp from "express";
import { register } from "../services/authServices.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { verifyToken } from "../middleware/verifyToken.js";

const checkAuthor = (req, res, next) => {
    if (!req.user || req.user.role !== "AUTHOR") {
        return res.status(403).json({ message: "Access denied: Author only" });
    }
    next();
};

export const authorRoute = exp.Router();

// register author(public route)
authorRoute.post("/users", async (req, res) => {
    // get user obj from req
    let userObj = req.body;
    // call register func
    const newUserObj = await register({ ...userObj, role: "AUTHOR" });
    // send res
    res.status(201).json({ message: "User created", payload: newUserObj });
})

// create article(protected)
authorRoute.post("/articles",verifyToken,checkAuthor,async (req, res) => {
    // get article from req
    let article = req.body;
    // enforce author from token
    article.author = req.user.userId;
    // create the article doc
    let articleDoc = new ArticleModel(article);
    // save the doc
    let createdDoc = await articleDoc.save();
    // send res
    res.status(201).json({message:"article successfully created",payload:createdDoc})
})

// read article of author(protected)
authorRoute.get("/articles/author/:authorId",verifyToken,checkAuthor, async (req, res) => {
    try {
        //get articles based on author id
        const authorId = req.params.authorId;
        
        const articles = await ArticleModel.find({ author: authorId }).populate("author","firstname");

        res.status(200).json({
            message: "Author articles fetched successfully",
            payload: articles
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//update the article(protected route)
authorRoute.put("/articles/:articleId",verifyToken,checkAuthor, async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const update = await ArticleModel.findByIdAndUpdate(
            articleId,req.body,{ new: true } );
        if (!update) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({message: "article updated successfully", payload: update
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// delete article(soft-delete)(protected)
authorRoute.delete("/articles/:articleId",verifyToken,checkAuthor, async (req, res) => {
    try {
        const articleId = req.params.articleId;
        //delete articles by ID
        const deletedArticle = await ArticleModel.findByIdAndUpdate(
            articleId,{ isArticleActive: false },{ new: true }
        );
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        //success message
        res.status(200).json({ message: "Article soft-deleted successfully", payload: deletedArticle
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

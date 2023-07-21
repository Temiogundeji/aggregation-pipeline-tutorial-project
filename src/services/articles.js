const { Article } = require("../models");
const mongoose = require("mongoose");

module.exports = {
  async createArticle(articleData) {
    try {
      const article = new Article(articleData);
      const articleExist = await Article.findOne({ title: article.title });
      if (articleExist) throw new Error("Article also exists");
      await article.save();
      return article;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getArticleById(articleId) {
    try {
      const article = await Article.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(articleId),
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "comments",
            foreignField: "_id",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$author" },
            pipeline: [
              {
                //match _id in the user collection to the authorId in the article collection
                $match: {
                  $expr: { $eq: ["$_id", "$$authorId"] },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                  // Include other non-sensitive fields you want to expose
                },
              },
            ],
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            title: 1,
            content: 1,
            category: 1,
            // Include other non-sensitive fields from the articles collection
            author: 1, // The 'author' field now contains only the specified fields from the users collection
            comments: 1,
          },
        },
      ]);

      if (!article) throw new Error("Article not found");
      return article;
    } catch (error) {
      throw new Error(error || "Article not found");
    }
  },

  async getArticleByAuthor(authorId) {
    try {
      const article = await Article.findOne({ author: ObjectId(authorId) });
      if (!article) throw new Error("Article not found");
      return article;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateArticle(articleId, articleData) {
    try {
      const article = await Article.findByIdAndUpdate(articleId, articleData, {
        new: true,
      });
      if (!article) throw new Error("Article not found");
      return article;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteArticle(articleId) {
    try {
      const article = await Article.findByIdAndDelete(articleId);
      if (!article) throw new Error("Article not found");
      return article;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getArticlesByCategories(categoryId) {
    try {
      const articles = await Article.aggregate([
        {
          $match: { _id: ObjectId(categoryId) },
        },
      ]);
      return articles;
    } catch (error) {
      throw new Error(error);
    }
  },
};

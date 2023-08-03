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
            _id: new mongoose.Types.ObjectId(String(articleId)),
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "article",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$author" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$authorId"] },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
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
                  namer: 1,
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
            author: 1,
            comments: {
              _id: 1,
              content: 1,
            },
            upvotes: 1,
            downvotes: 1,
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
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async getArticleWithMostComments() {
    try {
      const article = await Article.aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "article",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$author" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$authorId"] },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                },
              },
            ],
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            title: 1,
            content: 1,
            author: 1,
            numComments: { $size: "$comments" },
            comments: 1,
          },
        },
        {
          $sort: {
            numComments: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);
      return article;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async getArticleWithMostUpvotes() {
    try {
      const article = await Article.aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "article",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$author" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$authorId"] },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                },
              },
            ],
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            title: 1,
            content: 1,
            author: 1,
            comments: 1,
            upvotes: 1,
          },
        },
        {
          $sort: {
            upvotes: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);
      console.log(article);
      return article;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async getMostRecentArticle() {
    try {
      const article = await Article.aggregate([
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);
      return article;
    } catch (e) {
      throw new Error("Error", e.message);
    }
  },
  async sortArticleBackwards() {
    try {
      const articles = await Article.aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "article",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$author" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$authorId"] },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                },
              },
            ],
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            title: 1,
            content: 1,
            author: 1,
            numComments: { $size: "$comments" },
            comments: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      return articles;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};




const { Article } = require("../models");
const { ObjectId } = require("mongodb");

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
      const article = await Article.findById(articleId)
        .populate("comments")
        .populate("category")
        .exec();
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

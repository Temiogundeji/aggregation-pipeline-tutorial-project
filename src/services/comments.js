const { ObjectId } = require("mongodb");
const { Comment, Article } = require("../models");

module.exports = {
  async createComment(commentData) {
    try {
      const comment = new Comment(commentData);
      const commentExist = await Comment.findOne({ content: comment.title });
      if (commentExist) throw new Error("Comment already exists");
      await comment.save();
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getCommentById(commentId) {
    try {
      const Comment = await Comment.findById(commentId);
      if (!Comment) throw new Error("Comment not found");
      return Comment;
    } catch (error) {
      throw new Error(error || "Comment not found");
    }
  },

  async getCommentByAuthor(authorId) {
    try {
      const comment = await Comment.findOne({ author: ObjectId(authorId) });
      if (!comment) throw new Error("Comment not found");
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateComment(commentId, commentData) {
    try {
      const comment = await Comment.findByIdAndUpdate(commentId, commentData, {
        new: true,
      });
      if (!comment) throw new Error("Comment not found");
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteComment(commentId) {
    try {
      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) throw new Error("Comment not found");
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getCommentsByCategories(categoryId) {
    try {
      const comments = await Comment.aggregate([
        {
          $match: { _id: ObjectId(categoryId) },
        },
      ]);
      return comments;
    } catch (error) {
      throw new Error(error);
    }
  },
  // async addCommentToArticle(articleId, commentObj) {
  //   try {
  //     const article = await Article.aggregate([
  //       { $match: { _id: ObjectId(articleId) } },
  //       {
  //         $addFields: {
  //           comments: { $push: { ...commentObj } },
  //         },
  //       },
  //     ]);
  //     console.log(article);
  //     return article;
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // },
};

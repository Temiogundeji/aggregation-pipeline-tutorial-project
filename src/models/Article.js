const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    upvotes: mongoose.Schema.Types.Number,
    downvotes: mongoose.Schema.Types.Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

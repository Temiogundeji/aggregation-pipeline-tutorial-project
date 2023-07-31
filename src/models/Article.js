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
    upvotes: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    downvotes: mongoose.Schema.Types.Number,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

// articleSchema.virtual("commentList", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "article",
// });

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

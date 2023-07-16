const handleAsync = require("../../utils/errorHandler");
const {
  getArticleByAuthor,
  getArticleById,
  getArticlesByCategories,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../../services/articles");
const { addCommentToArticle } = require("../../services/comments");

const newArticle = handleAsync(async (req, res) => {
  const article = await createArticle(req.body);
  res.send({ success: true, article });
});

const postCommentOnArticle = handleAsync(async (req, res) => {
  const articleId = req.params.articleId;
  const commentObj = req.body;
  if (!articleId) {
    throw new Error(`Please add a valid article ID`);
  }
  const articleFound = await getArticleById(articleId);
  if (!articleFound) throw new Error("Article does not exists");
  const article = await addCommentToArticle(articleId, commentObj);
  res.send({ success: true, article });
});

const modifyArticle = handleAsync(async (req, res) => {
  if (!req.body) {
    res.send({ success: false });
  }
  const article = await updateArticle(req.params.id, req.body);
  res.send({
    success: true,
    updatedArticle: article,
    message: "article has been updated successfully",
  });
});

module.exports = { newArticle, modifyArticle, postCommentOnArticle };

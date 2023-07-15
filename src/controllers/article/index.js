const handleAsync = require("../../utils/errorHandler");
const {
  getArticleByAuthor,
  getArticleById,
  getArticlesByCategories,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../../services/articles");

const newArticle = handleAsync(async (req, res) => {
  const article = await createArticle(req.body);
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

module.exports = { newArticle, modifyArticle };

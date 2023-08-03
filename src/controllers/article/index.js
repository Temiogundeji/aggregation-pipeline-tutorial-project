const handleAsync = require("../../utils/errorHandler");
const {
  getArticleByAuthor,
  getArticleById,
  getArticlesByCategories,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleWithMostComments,
  getArticleWithMostUpvotes,
  getArticleMostRecentArticle,
  getMostRecentArticle,
} = require("../../services/articles");
const { ObjectId } = require("mongodb");

const newArticle = handleAsync(async (req, res) => {
  const article = await createArticle(req.body);
  res.send({ success: true, article });
});
const fetchArticleById = handleAsync(async (req, res) => {
  try {
    const article = await getArticleById(new ObjectId(req.params.articleId));
    res.send({ success: true, article });
  } catch (e) {
    throw new Error(e.message);
  }
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
const fetchArticleWithMostComments = handleAsync(async (req, res) => {
  const article = await getArticleWithMostComments();
  if (!article) throw new Error("No article has more comments!");
  res.send({ success: true, article });
});

const fetchArticleWithMostUpvotes = handleAsync(async (req, res) => {
  const article = await getArticleWithMostUpvotes();
  if (!article) throw new Error("Article not found");
  res.send({ success: true, article });
});

const fetchMostRecentArticle = handleAsync(async (req, res) => {
  const article = await getMostRecentArticle();
  if (!article) throw new Error("Article not found");
  res.send({ success: true, article });
});

module.exports = {
  newArticle,
  modifyArticle,
  fetchArticleById,
  fetchArticleWithMostComments,
  fetchArticleWithMostUpvotes,
  fetchMostRecentArticle,
};

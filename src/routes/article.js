const router = require("express").Router();
const {
  newArticle,
  modifyArticle,
  fetchArticleById,
} = require("../controllers/article");
const { getArticleById } = require("../services/articles");

router.get("/:articleId", fetchArticleById).post("/", newArticle);
router.post("/", modifyArticle);

module.exports = router;

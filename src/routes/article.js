const router = require("express").Router();
const {
  newArticle,
  modifyArticle,
  fetchArticleById,
  fetchArticleWithMostComments,
  fetchArticleWithMostUpvotes,
  fetchMostRecentArticle,
  getArticlesInDescending,
} = require("../controllers/article");
const { authMiddle } = require("../middlewares/authorization");

// router.route("/").post(newArticle).patch(modifyArticle);
router.get("/most-recent", authMiddle, fetchMostRecentArticle);
router.get("/sorted-by-date-desc", authMiddle, getArticlesInDescending);
router.get("/most-comments", authMiddle, fetchArticleWithMostComments);
router.get("/most-upvotes", authMiddle, fetchArticleWithMostUpvotes);
router.get("/:articleId", authMiddle, fetchArticleById);

module.exports = router;

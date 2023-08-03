const router = require("express").Router();
const {
  newArticle,
  modifyArticle,
  fetchArticleById,
  fetchArticleWithMostComments,
  fetchArticleWithMostUpvotes,
  fetchMostRecentArticle,
} = require("../controllers/article");
const { authMiddle } = require("../middlewares/authorization");

// router.route("/").post(newArticle).patch(modifyArticle);
router.get("/most-recent", authMiddle, fetchMostRecentArticle);
router.get("/most-comments", authMiddle, fetchArticleWithMostComments);
router.get("/most-upvotes", authMiddle, fetchArticleWithMostUpvotes);
router.get("/:articleId", authMiddle, fetchArticleById);

module.exports = router;

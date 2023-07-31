const router = require("express").Router();
const {
  newArticle,
  modifyArticle,
  fetchArticleById,
  fetchArticleWithMostComments,
} = require("../controllers/article");
const { authMiddle } = require("../middlewares/authorization");

router.get("/most-comments", authMiddle, fetchArticleWithMostComments);

// router.route("/").post(newArticle).patch(modifyArticle);
router.get("/:articleId", authMiddle, fetchArticleById);

module.exports = router;

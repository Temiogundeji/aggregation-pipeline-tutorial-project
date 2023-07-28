const router = require("express").Router();
const {
  newArticle,
  modifyArticle,
  fetchArticleById,
} = require("../controllers/article");
const {authMiddle}  = require("../middlewares/authorization");

router.get("/:articleId", authMiddle, fetchArticleById);
router.route("/").post(newArticle);
router.patch("/", modifyArticle);

module.exports = router;

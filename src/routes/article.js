const router = require("express").Router();
const { newArticle, modifyArticle } = require("../controllers/article");

router.post("/", newArticle);
router.post("/", modifyArticle);
router.post("/:articleId/comments");

module.exports = router;

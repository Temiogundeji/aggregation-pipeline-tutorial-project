const router = require("express").Router();
const { newArticle, modifyArticle } = require("../controllers/article");

router.post("/", newArticle);
router.post("/", modifyArticle);

module.exports = router;

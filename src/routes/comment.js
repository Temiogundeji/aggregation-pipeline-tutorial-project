const router = require("express").Router();
const { newComment, modifyComment } = require("../controllers/comment");

router.post("/", newComment);
router.post("/", modifyComment);

module.exports = router;

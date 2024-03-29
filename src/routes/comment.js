const router = require("express").Router();
const {
  newComment,
  modifyComment,
  fetchLatestComment,
} = require("../controllers/comments");
const { authMiddle } = require("../middlewares/authorization");

router.post("/", newComment);
router.post("/", modifyComment);
router.get("/most-recent", authMiddle, fetchLatestComment);

module.exports = router;

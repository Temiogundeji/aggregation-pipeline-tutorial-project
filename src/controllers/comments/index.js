const handleAsync = require("../../utils/errorHandler");
const {
  createComment,
  updateComment,
  getMostRecentComment,
} = require("../../services/comments");

const newComment = handleAsync(async (req, res) => {
  const comment = await createComment(req.body);
  res.send({ success: true, comment });
});

const modifyComment = handleAsync(async (req, res) => {
  if (!req.body) {
    res.send({ success: false });
  }
  const comment = await updateComment(req.params.id, req.body);
  res.send({
    success: true,
    updatedComment: comment,
    message: "comment has been updated successfully",
  });
});

const fetchLatestComment = handleAsync(async (req, res) => {
  const comment = await getMostRecentComment();
  console.log("COMMENT", comment);
  if (!comment) throw new Error("Comment not found!");
  res.send({ success: true, comment });
});

module.exports = { newComment, modifyComment, fetchLatestComment };

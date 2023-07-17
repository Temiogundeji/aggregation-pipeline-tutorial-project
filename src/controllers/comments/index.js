const handleAsync = require("../../utils/errorHandler");
const { createComment, updateComment } = require("../../services/comments");

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

module.exports = { newComment, modifyComment };

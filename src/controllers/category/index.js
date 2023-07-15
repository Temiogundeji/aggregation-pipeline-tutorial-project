const handleAsync = require("../../utils/errorHandler");
const { createCategory, updateCategory } = require("../../services/category");

const newCategory = handleAsync(async (req, res) => {
  const category = await createCategory(req.body);
  res.send({ success: true, category });
});

const modifyCategory = handleAsync(async (req, res) => {
  if (!req.body) {
    res.send({ success: false });
  }
  const category = await updateCategory(req.params.id, req.body);
  res.send({
    success: true,
    updatedCategory: category,
    message: "category has been updated successfully",
  });
});

module.exports = { newCategory, modifyCategory };

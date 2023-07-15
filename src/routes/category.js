const { newCategory, modifyCategory } = require("../controllers/category");
const router = require("express").Router();

router.post("/", newCategory);
router.post("/", modifyCategory);

module.exports = router;

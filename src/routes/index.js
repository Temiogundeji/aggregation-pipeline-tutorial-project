const router = require("express").Router();
const authRoutes = require("./auth");
const articleRoutes = require("./article");
const commentRoutes = require("./comment");
const categoryRoutes = require("./category");

router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/comments", commentRoutes);

module.exports = router;

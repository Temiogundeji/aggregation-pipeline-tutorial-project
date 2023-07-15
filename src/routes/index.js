const router = require("express").Router();
const authRoutes = require("./auth");
const articleRoutes = require("./article");
const commentRoutes = require("./comment");
const categoryRoutes = require("./category");

router.use("/auth", authRoutes);
router.use("/article", articleRoutes);
router.use("/category", categoryRoutes);
router.use("/comment", commentRoutes);

module.exports = router;

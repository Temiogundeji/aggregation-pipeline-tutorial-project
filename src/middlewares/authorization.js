const handleAsync = require("../utils/errorHandler");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports.authMiddle = handleAsync(async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) throw new Error("Invalid credentials");
  const tokenString = authToken.split("Bearer")[1].trim();
  if (!tokenString) throw new Error("Invalid credentials");
  const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
  const user = await User.findById(decoded?.id).exec();

  if (!decoded || !user) throw new Error("Invalid credentials");
  req.user = user;
  next();
});

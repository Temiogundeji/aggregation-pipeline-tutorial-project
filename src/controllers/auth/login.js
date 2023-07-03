const bcrypt = require("bcrypt");
const { User } = require("../../models");
const handleAsync = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");

const login = handleAsync(async (req, res) => {
  const user = User.findOne({
    email: req.body.email,
  });
  if (!user || bcrypt.compareSync(String(req.body.password), user.password)) {
    throw new Error("Invalid Credentials");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const { password, ...rest } = user;
  res.send({ success: true, user: rest, token });
});

module.exports = login;

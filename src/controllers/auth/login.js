const bcrypt = require("bcrypt");
const { User } = require("../../models");
const handleAsync = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");

const login = handleAsync(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  const isPasswordMatch = await bcrypt.compare(
    String(req.body.password),
    user.password
  );
  if (!user || !isPasswordMatch) {
    throw new Error("Invalid Credentials");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const {
    _doc: { password, ...rest },
  } = user;
  res.send({ success: true, user: rest, token });
});

module.exports = login;

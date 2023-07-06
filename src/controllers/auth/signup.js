const bcrypt = require("bcrypt");
const joi = require("joi");
const { User } = require("../../models");
const handleAsync = require("../../utils/errorHandler");

const signup = handleAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const schema = joi.object({
    username: joi
      .string()
      .required()
      .error(new Error("Please include your username"))
      .min(1),
    email: joi
      .string()
      .min(1)
      .pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      .required()
      .error(new Error("Please provide valid email")),
    password: joi
      .string()
      .required()
      .error(new Error("Please include password"))
      .min(1),
  });
  await schema.validateAsync({ username, email, password });
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    throw new Error("User already exists");
  }
  //   const tempToken = jwt.sign({ email }, process.env.JWT_SECRET, {
  //     expiresIn: "7d",
  //   });

  await User.create({
    username,
    email,
    password: bcrypt.hashSync(String(password), 10),
  });
  res.send({ success: true });
});

module.exports = signup;

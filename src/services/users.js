const User = require("../models/User");
const { AppError, HttpCode } = require("../exceptions/AppError");

module.exports = {
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "Error creating user",
      });
    }
  },

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "User not found",
      });
    }
  },

  async getUserByEmail(email) {
    try {
      const user = User.findOne({ email });
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "User not found",
      });
    }
  },
  async updateUser(userId, userData) {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "User not found",
      });
    }
  },
  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "User not found",
      });
    }
  },
};

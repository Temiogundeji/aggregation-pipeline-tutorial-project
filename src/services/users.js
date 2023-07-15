const User = require("../models/User");

module.exports = {
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getUserByEmail(email) {
    try {
      const user = User.findOne({ email });
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  },
  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const { Category } = require("../models");
const { ObjectId } = require("mongodb");

module.exports = {
  async createCategory(categoryData) {
    try {
      const category = new Category(categoryData);
      const categoryExist = await Category.findOne({ title: category.title });
      if (categoryExist) throw new Error("Category also exists");
      await Category.save();
      return Category;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getCategoryById(categoryId) {
    try {
      const Category = await Category.findById(categoryId);
      if (!Category) throw new Error("Category not found");
      return Category;
    } catch (error) {
      throw new Error(error || "Category not found");
    }
  },

  async getCategoryByAuthor(authorId) {
    try {
      const category = await Category.findOne({ author: ObjectId(authorId) });
      if (!category) throw new Error("Category not found");
      return category;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateCategory(categoryId, categoryData) {
    try {
      const category = await Category.findByIdAndUpdate(
        categoryId,
        categoryData,
        {
          new: true,
        }
      );
      if (!category) throw new Error("Category not found");
      return category;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteCategory(categoryId) {
    try {
      const category = await Category.findByIdAndDelete(categoryId);
      if (!category) throw new Error("Category not found");
      return category;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const express = require("express");
const Category = require("../models/Category");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// Create a new category (only admin)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
});

module.exports = router;

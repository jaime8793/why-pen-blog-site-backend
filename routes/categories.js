const express = require("express");
const router = express.Router();

// Mock categories (you can replace this with a database model later)
const categories = ["Technology", "Travel", "Food", "Lifestyle"];

router.get("/", (req, res) => {
  res.json(categories);
});

module.exports = router;

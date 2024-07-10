const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { authMiddleware } = require("./auth");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single post
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Create a post (protected)
router.post("/", authMiddleware, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    snippet: req.body.content.substring(0, 150) + "...",
    author: req.body.author,
    category: req.body.category,
    tags: req.body.tags,
    image: req.body.image,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post (protected)
router.delete("/:id", authMiddleware, getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

module.exports = router;

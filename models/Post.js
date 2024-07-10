const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  snippet: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  tags: [{ type: String }],
  image: { type: String },
});

module.exports = mongoose.model("Post", PostSchema);

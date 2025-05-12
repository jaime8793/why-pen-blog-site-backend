const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "https://why-pen-blog-site-frontend.vercel.app/", // Allow requests from your frontend
  methods: "POST,OPTIONS,GET", // Allow POST and OPTIONS requests
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
  credentials: true, // Allow sending cookies, if needed
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: "1mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));

app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

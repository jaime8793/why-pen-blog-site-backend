const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/users");
require("dotenv").config();

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Allow all other origins
      return callback(null, true);
    },
    credentials: true,
  })
);

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
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));

app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

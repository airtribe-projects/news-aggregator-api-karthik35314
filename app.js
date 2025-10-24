require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/news", newsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;

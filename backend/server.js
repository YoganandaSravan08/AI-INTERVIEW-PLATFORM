require("dotenv").config();
const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", resumeRoutes);
app.use("/api/interview", interviewRoutes);

// test route
app.get("/", (req, res) => {
  res.send("AI Interview Platform Backend Running");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
}); 
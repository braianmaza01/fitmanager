const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;

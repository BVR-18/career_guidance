const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const notFound = require("./middleware/notFound");
const assessmentRoutes = require("./routes/assessmentRoutes");
const careerRoutes = require("./routes/careerRoutes");
const chatRoutes = require("./routes/chatRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");
const compareRoutes = require("./routes/compareRoutes");

const app = express();

// Security
app.use(helmet());

// Logger
app.use(morgan("dev"));

// CORS configuration supporting dynamic Vercel URLs and configurable origins
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5174", "http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes("*") ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Body Parser
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/compare", compareRoutes);

app.use(notFound);
app.use(errorHandler);

// Test Route
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "CareerVerse Backend Running"
    });

});

module.exports = app;
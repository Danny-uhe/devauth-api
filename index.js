require('dotenv').config();


const express = require("express");
const { default: helmet } = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB Connection 
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Database Connected!");
  })
  .catch((err) => {
    console.error("❌ Database Connection Error:");
    console.error(err.message);
    process.exit(1);
  });

// Routes 

  app.use("/api/auth", authRouter);
  app.use("/api/posts", postsRouter);
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  });

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevAuth API is running 🚀",
    version: "1.0.0"
});
});

const PORT = process.env.PORT || 5000;
// Start Server 
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

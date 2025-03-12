const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/connection");
const errorHandler = require("./middlewares/errorMiddleware");
const app = express();

const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_OPTION,
  optionsSuccessStatus: 200,
};

// Middleware setup
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// Error handling middleware
app.use(errorHandler);

connectDB()
  .then((connectionInstance) => {
    console.log(
      `Connection established: ${connectionInstance.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1);
  });

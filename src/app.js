const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./db/connection");
const app = express();
const PORT = process.env.PORT || 5000;

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

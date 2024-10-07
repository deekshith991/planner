const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

console.log("[+] Starting the Server");

const SERVER_PORT = process.env.PORT || 3333;
const MongoUri = process.env.MongoUri || "mongodb://localhost:27017/planner";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`[+] Success - Connected to Db @ ${MongoUri}`);
    app.listen(SERVER_PORT, () => {
      console.log(`[+] Success - Server Running @ http://localhost:${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.error("[-] Error Connecting to the DB:", err.message);
  });

// Handle connection events
const db = mongoose.connection;

db.on('error', (error) => {
  console.error("[-] Database connection error:", error);
});


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

dotenv.config();

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

// API Documentation Endpoint
app.get('/', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API info</title>
    </head>
    <body>
        <h1>Welcome to My Daily Planner Server API</h1>
        <p>Here are some Documentation for the EndPoints :</p>
        <ul>
            <li><a href="http://localhost:${SERVER_PORT}/api/auth/register">Register</a></li>
            <li><a href="http://localhost:${SERVER_PORT}/api/auth/login">Login</a></li>
        </ul>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

// Routes
const AuthRoute = require("./Routes/Auth.Route");
app.use("/api/auth", AuthRoute);


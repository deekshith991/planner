/*
 * this is the Entry point to the server
 * */

// Getting the data from Environment variables
const dotenv = require('dotenv');
dotenv.config();

// Modules required
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");

console.log("[+] Starting Server");

// Middleware
const app = express();
app.use(express.json());
app.use(cors());

// constants
const Port = process.env.PORT || 3333;
const MongoUri = process.env.MongoUrl || "mongodb://localhost:27017/planner";
const db = mongoose.connection;



// DataBase connection 
mongoose.connect(MongoUri);

db.once('error', () => {
  console.log("[-] Error Connecting server \n\n");
})

db.on('open', () => {
  console.log(`[+] Connected to DataBase ${MongoUri}`);

  app.listen(Port, () => {
    console.log(`[+] Server Online @port ${Port}`);
  });

});



// Documentation request
app.get("/", (req, res) => {

  const data = `
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
<li><a href="http://localhost:${Port}/api/auth/register">Register</a></li>
<li><a href="http://localhost:${Port}/api/auth/login">Login</a></li>
</ul>
</body>
</html>
`;

  res.send(data).status(200);
});


// Routes importing
const RegisterRoute = require("./Routes/Register.route.js");
const LoginRoute = require("./Routes/Login.route.js");


// Routes access
app.use("/api/auth", RegisterRoute);
app.use("/api/auth", LoginRoute);

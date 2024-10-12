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

})

/*
 * this is the Entry point to the server
 * */

// Getting the data from Environment variables
const dotenv = require('dotenv');
dotenv.config();

// Modules required
const mongoose = require('mongoose');

console.log("[+] Starting Server");

// Middleware

// constants
const MongoUri = process.env.MongoUrl || "mongodb://localhost:27017/planner";
const db = mongoose.connection;



// DataBase connection 
mongoose.connect(MongoUri);
db.once('error', () => {
  console.log("[-] Error Connecting server \n\n");
})
db.on('open', () => {
  console.log(`[+] Connected to DataBase ${MongoUri}`)
})

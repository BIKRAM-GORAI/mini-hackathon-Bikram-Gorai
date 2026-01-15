import express from "express";
import "dotenv/config"; 
import connectDB from "./config/db.js"//connection function 
import authRoutes from "./routes/authRoutes.js";//importing authRoutes so that we can use login and register
import requestRoutes from "./routes/requestRoutes.js";


import path from "path";
import { fileURLToPath } from "url";


const app=express();//making a express instance
app.use(express.json());

//it is a middle ware that parses incoming json data
//without this req.body will be undefined

connectDB();//databse  connection function calling

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


app.use("/api/auth",authRoutes);

app.use("/api/requests",requestRoutes)

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});




//!      refer to thoughts8.txt for line to line explanation of the next few connection lines
// Convert import.meta.url to file path
const __filename = fileURLToPath(import.meta.url);

// Get directory name from file path
const __dirname = path.dirname(__filename);

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve create-request page
app.get("/create-request", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create-request.html"));
});
app.get("/browse-requests", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "requests.html"));
});







app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});






const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});




//import "dotenv/config"; =>  loads environment variables into process.env

//! SOME IMPORTANT QUESTIONS

// Why is dotenv loaded before everything else?
//=>so that functions can access the secret variables and work on them otherwise many functions that rely on them may fail
//any code running before teh import wont see the env variables

// Why do we call connectDB() in server.js?
//=>so that backend maay establish the connection with the databse
//only after the connection should the server start listening


// Why is express.json() necessary?
//=>without it express cannot parse json data

//=>CHATGPT VERSION
        //=> express.json() is required to parse incoming JSON request bodies.
        // Without it, req.body will be undefined for JSON-based API requests.


// What happens if MongoDB connection fails?
//=>we have already made the error fallback in db.js ,the server will not run if the connection fails

//THE process exits prevcenting the server from running with a non established databse connection


// Why is server.js kept minimal?
//=>beacuse it acts as wiring to many files
//messing it up may cause confusion
//clean code ensures readibility ,debugging easier
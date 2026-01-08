import express from "express";
import "dotenv/config"; 
import connectDB from "./config/db.js"//connection function 
import authRoutes from "./routes/authRoutes.js";//importing authRoutes so that we can use login and register

const app=express();//making a express instance
app.use(express.json());

//it is a middle ware that parses incoming json data
//without this req.body will be undefined

connectDB();//databse  connection function calling

app.get("/",(req,res)=>{
    res.send("mongo db connection successful")
});//it is a test route 
//it will return this message when visiting the home page in the frontend

app.use("/api/auth",authRoutes);

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
import express from "express";
import "dotenv/config"; 
import connectDB from "./config/db.js"//connection function 

const app=express();//making a express instance

app.use(express.json());
//it is a middle ware that parses incoming json data
//without this req.body will be undefined

connectDB();//databse  connection function calling

app.get("/",(req,res)=>{
    res.send("mongo db connection successful")
});//it is a test route 
//it will return this message when visiting the home page in the frontend

const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});
















//import "dotenv/config"; =>  loads environment variables into process.env
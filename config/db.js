import mongoose from "mongoose"

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);//for making the connection
        console.log("MONGO Db connection successfull")//successful message
    }
    catch(error){
        console.log("Mongo DB connection failed: ",error.message);//error message

        process.exit(1);//this code stops the server from starting if the database connection fails
    }
};

export default connectDB;//exportng so that it can be used everywhere else




//! SOME IMPORTANT QUESTIONS
// Why do we use async in database connection?
//=>we use async because we do not wnat the server to stop and wait until the database is connected ,it allows other node functions to run while other things work in the background

// now 1 thing to keep in mind is that for await to work it needs to be inside a async function so to pause execution until the database is connected we use await but to use await we need to put it under async

// Why do we use await mongoose.connect()?
//=>we use await beacause server should not start until the databse connection is successful or otherwise api may fail and many things may break


// Why is DB logic in a separate file?
//=> to maintain a clean code 


// Why should the server stop if DB connection fails?
//=>so that nothing breaks


// Why are environment variables used?
//=>to protect confidential information  from getting leaked and uploaded to github
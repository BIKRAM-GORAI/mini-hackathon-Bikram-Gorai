import mongoose from "mongoose"

const requestSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true  
    },
    status:{
        type:String,
        enum:["OPEN","ACCEPTED","COMPLETED"],
        default:"OPEN",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    acceptedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    }},

    {timestamps:true}
)


const Request= mongoose.model("Request",requestSchema);
export default Request;




//What i learnt

// what is enum?
//  => so enum allows only some fixed values to be entered to the database and does not allow some random string to be entered , which make the data predictable and less buggy and prevents unexpected input

//* IMPORTANT CONCEPTS
//what is ObjectId?
//ObjectId creates a reference to another mongoDb document.
//by this we can directly get all the fields of that user using that reference and show details of that user 
//What is ref:"User"?
//ref tells mongoose which collection this ObjectId belongs to .




//Why use Timestamps?
// =>to keep tract of when a particular document (do not mistake it for collection) gets created and updated
//also we can arrange the collection according to time

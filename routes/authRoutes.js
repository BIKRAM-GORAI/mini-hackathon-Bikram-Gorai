import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/User.js";

const router = express.Router();//creating a express router so that we can attach routes like /register and /login


//now logic for register user

router.post("/register",async(req,res)=>{
    try{
        const{name,email,password}=req.body;//this line meaning is written in the  file authRouteshelp.txt

        if(!name||!email||!password)
        {
            return res.status(400).json({message:"All fields are required"})
        }

        const existingUser=await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).json({message:"User already exists"})
        }

        const hashedpassword=await bcrypt.hash(password,7);

        const newUser= new User({
            name,
            email,
            password:hashedpassword,
        })//storing the new details in newUser

        await newUser.save();//adding the newUser in database

        res.status(201).json({message:"user registered successfully"})

    }catch(error){
        res.status(500).json({message:"server error"})

    }
})


router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch)
        {
            return res.status(400).json({message:"Invalid credentials"})
        }

        return res.status(200).json({message:"Login Sucessful"})

    }catch(error){
        return res.status(500).json({message:"server error"})
    }
});


export default router;



// !  QUESTIONS YOU MUST BE ABLE TO ANSWER

// Why do we hash passwords?
//=> so that no one see and decrypt the password and if the database is leaked also then it is not possible to find out the password
//it is a one way hash and it cannot be decrypted ,it can only be compared

//!  Why is bcrypt.compare async?
//*one very very important concept here
//^ we use async so that other node js functions keep running or else 
//     🧪 Let’s imagine a real situation (this is the key)

// Your server has 100 users online.
// At the same moment:
// User A → logging in
// User B → fetching posts
// User C → registering
// User D → requesting homepage
// User E → refreshing token
// Now think carefully 👇

// ❌ What happens if bcrypt.compare() were synchronous?
// const isMatch = bcrypt.compareSync(password, hash);

// Timeline:
// User A login starts
// bcrypt comparison takes ~200ms
// During those 200ms…
// 🚨 EVERY other request WAITS
// User B → frozen
// User C → frozen
// User D → frozen
// User E → frozen
// Even though they have nothing to do with login.
// That is the real problem.





// Why do we check user existence before register?
//=>to prevent duplication and conflicts

// Why do we return same error for wrong email/password?
//=>so that hackers or attackers cannot guess which one is wrong or else if they get that a certain email is present then they may try to guess the password and same with password knowing also

// Why don’t we send password back?
//=>it possess a security risk and also if we use bcrypt we cannot send password even if we want to
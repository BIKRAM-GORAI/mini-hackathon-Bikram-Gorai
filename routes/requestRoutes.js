import express from "express";

import Request from "../models/Request.js";

const router = express.Router();

//for creating new requests

router.post("/", async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;
    if (!title || !description || !category || !userId) {
      return res.status(400).json({ message: "All fields should be entered" });
    }

    const newRequest = new Request({
      title,
      description,
      category,
      status: "OPEN",
      createdBy: userId,
    });
    await newRequest.save();

    return res.status(201).json({ message: "Request Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Request could not be created" });
  }
});

//for fetching requests

router.get("/", async (req, res) => {
  try {
    const requests = await Request.find({ status: "OPEN" });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Cannot get requests from server" });
  }
});

router.post("/:id/accept", async (req, res) => {
  try {
    const requestId = req.params.id;

    const { userId } = req.body; //getting the helper id from req.body that is send from the frontend
    //more details in requesrrouteshelp.txt


    const requestPresent = await Request.findById(requestId);
    if (!requestPresent) {
      return res
        .status(400)
        .json({ message: "No requests found to be accepted" });
    }
    console.log("STATUS FROM DB ->", requestPresent.status);
    console.log("STATUS LENGTH ->", requestPresent.status.length);
    if (requestPresent.status != "OPEN") {
      return res
        .status(400)
        .json({ message: "The request is not open to be accepted" });
    }

    requestPresent.acceptedBy = userId; //we can also update a particular field only
    requestPresent.status = "ACCEPTED";

    await requestPresent.save();

    return res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error " });
  }
});

//now for task completion
router.post("/:id/complete", async (req, res) => {
  try {
    const requestId = req.params.id;
    console.log(requestId);
    const { userId } = req.body;

    const isRequest = await Request.findById(requestId);

    if (!isRequest) {
      return res
        .status(404)
        .json({ message: "No request present to be marked as completed" });
    }

    if (isRequest.createdBy.toString() != userId) {
      return res.status(403).json({ message: "Not authorised" });
    }

    isRequest.status = "COMPLETED";

    await isRequest.save();

    return res.status(200).json({ message: "Request marked as completed" });
  } catch (error) {

    return res.status(500).json({ message: "server error" });
  }
});

export default router;

//* new things here
//.find to find all the available data
//findOne to find one data only

//^i learnt how to send json file
//return res.status(200).json(requests);

//example what happens behind the scene
// If requests is:
// [
//   { name: "Bikram", skill: "Backend" },
//   { name: "Rahul", skill: "Frontend" }
// ]

// The client receives:
// [
//   { "name": "Bikram", "skill": "Backend" },
//   { "name": "Rahul", "skill": "Frontend" }
// ]

//^ I had a doubt about how we have never defined userId anywhere but we are sending it from the frontend so where are getting this from
//& so the thing is that userId need not to be created as mongodb automatically creates a unique id to every user ,we are just using that ex-(_id),but keep in mind it is a object id so we need to handle and store that as object id in request model ,it cannot be stored as a string

// !🧠 QUESTIONS JUDGES MAY ASK (YOU’RE READY)

// Why do we check status before accepting?
//=>to avoid mismatch ,we will only allow to accept a request if it is open ,not when it is accepted or completed

// What prevents multiple acceptance?
//=>we mark it as accepted so it wont be shown to other people

// Why compare userId when completing?
//=>to let only the host complete the job not anyone else

// Why status field instead of deleting request?
//=>to keep a record and if any errors we can recover back

// How would you secure this later?
//=>we can implement jwt tokens so that we need not to send userid from frontend

// If you answer these → top-tier backend score 🔥

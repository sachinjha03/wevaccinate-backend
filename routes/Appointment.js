const express = require('express')
const router = express.Router();
const appointments = require("../models/appointments")
const jwt = require('jsonwebtoken')
const secretKey = "SACHINKUMARJHA12345"

router.post("/book-appointment" , async(req,res) => {
    try{   
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).json({success:false , reason : "Unauthorized"})
        }
        
        const decode = jwt.verify(token , secretKey);
        const userID = decode.userID;

        const newAppointment = new appointments({
            name:req.body.name,
            age:req.body.age,
            contact:req.body.contact,
            date : req.body.date,
            address : req.body.address,
            vaccineName : req.body.vaccineName,
            file : req.body.file,
            userId : userID
        })
        const response = await newAppointment.save()
        res.status(200).json({success:true , data : response})
    }catch(err){
        res.status(400).json({success:false , reason:err});
    }
})


router.get("/read-all-appointments" , async(req,res) => {
    try{
        const response = await appointments.find();
        res.status(200).json({success:true , data:response})
    }catch(err){
        res.status(400).json({success:false , reason:err})
    }
})

router.get("/read-my-appointments", async (req, res) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({ success: false, reason: "Unauthorized" });
        }
        const decode = jwt.verify(token, secretKey);
        const userID = decode.userID;

        // Find appointments of the logged-in user
        const userAppointments = await appointments.find({ userId: userID });

        // Check if appointments exist
        if (userAppointments.length === 0) {
            return res.status(404).json({ success: false, reason: "No appointments found" });
        }

        res.status(200).json({ success: true, data: userAppointments });
    } catch (err) {
        res.status(400).json({ success: false, reason: err.message });
    }
});

router.delete("/delete-appointment/:id" , async(req,res) => {
    try{
        const id = req.params.id;
        const response = await appointments.findByIdAndDelete({_id:id});
        res.status(200).json({success:true , data:response })
    }catch(err){
        res.status(400).json({success:false , reason:err})
    }
})


module.exports = router;
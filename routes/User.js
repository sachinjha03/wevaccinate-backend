const express = require('express')
const router = express.Router()
const users = require("../models/users")
const jwt = require('jsonwebtoken')
const secretKey = "SACHINKUMARJHA12345"

router.post("/create-user" , async(req,res) => {
    try{
        const generateUserId = (length = 10) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let userId = '';
            for (let i = 0; i < length; i++) {
                userId += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return userId;
        };
        const confirmPassword = req.body.confirmPassword;
        const newUser = new users({
            userID : generateUserId(),
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            contact : req.body.contact,
        })
        if(confirmPassword === req.body.password){
            const response = await newUser.save();
            res.status(200).json({success:true , data:response});
        }else{
            res.status(400).json({success:false , reason : "Password Mismatched!"})
        }
    }catch(err){
        res.status(400).json({success:false , reason:err})
    }
})

router.get("/read-all-users" , async(req,res) => {
    try{
        const response = await users.find();
        res.status(200).json({success:true , data:response})
    }catch(err){
        res.status(400).json({success:false , reason : err})
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const myUser = await users.findOne({ email: email });

        if (!myUser) {
            return res.status(404).json({ success: false, reason: "User Doesn't Exist" }); // ✅ Added return
        }

        if (myUser.password !== password) {
            return res.status(400).json({ success: false, reason: "Incorrect Password" }); // ✅ Added return
        }

        const token = jwt.sign({ userID: myUser.userID }, secretKey);
        return res.status(200).json({ success: true, data: myUser, token: token }); // ✅ Correct return statement

    } catch (err) {
        return res.status(500).json({ success: false, reason: "Internal Server Error" }); // ✅ Return added
    }
});


router.get("/read-my-details" , async(req,res) => {
    try{
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({ success: false, reason: "Unauthorized" });
        }
        const decode = jwt.verify(token, secretKey);
        const userID = decode.userID;
        const user = await users.find({userID});
        res.status(200).json({success:true , data:user})
    }catch(Err){
        res.status(400).json({success:false , reason:Err})
    }
})

router.get("/verify-token", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, reason: "Unauthorized: No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        const userID = decoded.userID;

        // Find user by userID
        const user = await users.findOne({ userID });

        if (!user) {
            return res.status(400).json({ success: false, reason: "Invalid token" });
        }

        // If user exists, return success response
        res.status(200).json({ success: true, data: user });

    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ success: false, reason: "Invalid or expired token" });
    }
});

module.exports = router;
const express = require('express')
const router = express.Router()
const  queries = require('../models/queries')


router.post("/add-query" , async(req,res) => {
    try{
        const newQuery = new queries({
            firstName:req.body.firstName,
            lastName : req.body.lastName,
            email:req.body.email,
            contact:req.body.contact,
            queryType:req.body.queryType,
            message:req.body.message
        })
        const response = await newQuery.save();
        res.status(200).json({success:true , data : response})
    }
    catch(err){
        res.status(400).json({success:false , reason : err})
    }
})

router.get("/read-all-queries" , async(req,res) => {
    try{
        const response = await queries.find();
        res.status(200).json({success:true , data : response})
    }catch(err){
        res.status(400).json({success:false , reason :err})
    }
})


module.exports = router;
const mongoose = require('mongoose')

const QuerySchema = new mongoose.Schema({
    firstName:String,
    lastName : String,
    email:String,
    contact:Number,
    queryType:String,
    message:String
})

const QueryModel = new mongoose.model("Query",QuerySchema);

module.exports = QueryModel;
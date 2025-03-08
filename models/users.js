const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userID : String,
    name : String,
    email : String,
    password : String,
    confirmPassword : String,
    contact : Number,
})

const UserModel = new mongoose.model("User" , UserSchema);

module.exports = UserModel;
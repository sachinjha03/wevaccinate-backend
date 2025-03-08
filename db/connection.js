const mongoose = require('mongoose')

// mongoose.connect("mongodb://127.0.0.1:27017/WeVaccinate").then(() => {
mongoose.connect("mongodb+srv://weVaccinate:weVaccinate@wevaccinate.k2tqu.mongodb.net/wevaccinate?retryWrites=true&w=majority&appName=weVaccinate").then(() => {
    console.log("Connected to Backend successfully");
}).catch((err) => {
    console.log("Failed to connect with database" + err);
})
const mongoose = require("mongoose")

const AppointmentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    contact:Number,
    date : Date,
    address:String,
    vaccineName:String,
    file : String,
    userId : String,
    status : {
        type : String,    
        default : 'Pending'
    }
})

const AppointmentModel = new mongoose.model("Appointment" , AppointmentSchema)

module.exports = AppointmentModel;
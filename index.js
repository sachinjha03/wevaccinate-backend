const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cors())
app.use(
  cors({
    origin: origin: "https://wevaccinate.netlify.app", // Replace with your actual frontend domains
    credentials: true, // Allow cookies & authentication headers
  })
);



require("./db/connection")


app.use("/api" , require("./routes/Query"))
app.use("/api" , require("./routes/User"))
app.use("/api" , require("./routes/Appointment"))

app.listen(8000 , () => {
    console.log("Hello from backend");
    
})

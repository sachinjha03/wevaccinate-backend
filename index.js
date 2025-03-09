const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cors())


app.use(
  cors({
    origin: ["http://localhost:5174" , "http://192.168.1.15:5174"], // Replace with your actual frontend domains
    credentials: true, // Allow cookies & authentication headers
  })
);



// app.use((req,res,next) => {
//   res.setHeader("Access-Control-Allow-Origin" , "https://wevaccinate.netlify.app/");
//   res.header(
//     "Access-Control-Allow-Headers" , 
//     "Origin , X-Requested-With, Content-Type , Accept"
//     );
//   next();
// })



require("./db/connection")


app.use("/api" , require("./routes/Query"))
app.use("/api" , require("./routes/User"))
app.use("/api" , require("./routes/Appointment"))

app.listen(8000 , () => {
    console.log("Hello from backend");
    
})

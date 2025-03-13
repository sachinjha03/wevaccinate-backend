const express = require('express')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials: true}));


require("./db/connection")


app.use("/api" , require("./routes/Query"))
app.use("/api" , require("./routes/User"))
app.use("/api" , require("./routes/Appointment"))

app.listen(PORT , () => {
    console.log("Hello from backend , Listening at " + PORT);
    
})

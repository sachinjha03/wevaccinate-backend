const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define allowed origins (update with your actual frontend URL)
const allowedOrigins = ["https://wevaccinate.netlify.app"];

app.use(
  cors({
    origin: allowedOrigins, // Allow only Netlify frontend
    credentials: true, // Enable credentials (cookies, headers)
  })
);

// Manually set CORS headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://wevaccinate.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

require("./db/connection");

app.use("/api", require("./routes/Query"));
app.use("/api", require("./routes/User"));
app.use("/api", require("./routes/Appointment"));

app.listen(PORT, () => {
  console.log("Hello from backend, Listening at " + PORT);
});

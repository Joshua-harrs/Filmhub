const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const dns = require("dns");
const os = require("os");
const { exec } = require("child_process");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Print server IPs for whitelist help
dns.lookup(os.hostname(), (err, address) => {
  if (err) {
    console.error("Error fetching server IP (hostname):", err);
  } else {
    console.log("Server IP address (hostname):", address);
  }
});

exec("curl ifconfig.me", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error fetching public IP: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Server public IP address: ${stdout.trim()}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected, bitch"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit app if DB connection fails
  });

// Basic test route
app.get("/", (req, res) => {
  res.send("Filmhub backend running, no cap");
});

// TODO: Add your routes here (auth, upload, etc.)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, gooners stay winning 🥀🙏`);
});

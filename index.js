const express = require('express');
const path = require('path');
const dotenv = require("dotenv") ;
const mongoose = require("mongoose");

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;


// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the index.html file for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// Connected with MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});



connect()
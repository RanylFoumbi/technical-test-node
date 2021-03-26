const mongoose = require('mongoose');
const db = 'mongodb://localhost/node-api';

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("You are now connected to MongoDB");
    else console.log("Connection error :" + err);
  }
)


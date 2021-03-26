const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street:{ 
    type: String
  },
  postalCode:{ 
    type: String
  },
  city:{ 
    type: String
  },
  country:{ 
    type: String
  },
});


const userSchema = new mongoose.Schema({
    matricule:{ 
      type: Number,
      unique: false
    },
    firstname:{ 
      type: String
    },
    lastname:{ 
      type: String
    },
    email:{ 
      type: String,
      unique: true
    },
    phone:{ 
      type: String
    },
    address: [addressSchema],
});


module.exports = mongoose.model("User",userSchema);
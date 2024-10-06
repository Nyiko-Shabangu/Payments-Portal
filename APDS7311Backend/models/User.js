import mongoose from 'mongoose';
//todo add bcrypt
//todo add jwt
//todo add hashing 


//const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
  type: String,
  required: true
  },  
  username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters are allowed"] // Only alphanumeric characters are allowed
  },
  idNumber: {
        type: String,
        required: true
    },
  accountNumber: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
    email: {
        type: String,
       required: true,
        unique: true,
        trim: true,
      // match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address']// Regular expression for email validation
    }
});


// Password hashing before saving a new customer
//userSchema.pre('save', async function (next) {
 // if (!this.isModified('password')) return next();
 // const salt = await bcrypt.genSalt(10);
 // this.password = await bcrypt.hash(this.password, salt);
 // next();
//});

// Password comparison method
//customerSchema.methods.matchPassword = async function (enteredPassword) {
  //return await bcrypt.compare(enteredPassword, this.password);
//};

//const Customer = mongoose.model('Customer', customerSchema);

export default mongoose.model("User", userSchema);
 


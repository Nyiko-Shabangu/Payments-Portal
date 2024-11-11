import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    match: [/^[a-zA-Z]+$/, "Only alphabetical characters are allowed."] // Only alphanumeric characters are allowed
  },
  surname: {
    type: String,
    trim: true,
    required: true,
    match: [/^[a-zA-Z]+$/, "Only alphabetical characters are allowed."] // Only alphanumeric characters are allowed
  },  
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  idNumber: {
    type: String,
    trim: true,
    required: true,
    match: [/^[0-9]+$/, "Only numeric characters are allowed."] // Allows only numbers
  },
  accountNumber: {
    type: String,
    trim: true,
    required: true,
    match: [/^[0-9]+$/, "Only numeric characters are allowed."] // Allows only numbers
  },
  password: {
    type: String,
    trim: true,
    required: true
  },role:{
    type: String,
    required: true,
    trim: true
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
 


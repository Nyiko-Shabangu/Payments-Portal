import mongoose from 'mongoose';

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
        trim: true
  //      match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters are allowed"]
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
    /*email: {
        type: String,
      //  required: true,
      //  unique: true,
        trim: true,
      //  match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters are allowed"]
    }*/
});

export default mongoose.model("User", userSchema);
 


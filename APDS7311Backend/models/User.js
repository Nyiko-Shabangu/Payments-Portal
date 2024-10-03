import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
    //    required: true,
        unique: true,
        trim: true
  //      match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters are allowed"]
    },
    password: {
        type: String//,
      //  required: true
    },
    email: {
        type: String,
      //  required: true,
      //  unique: true,
        trim: true,
      //  match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters are allowed"]
    }
});

export default mongoose.model("User", userSchema);
 


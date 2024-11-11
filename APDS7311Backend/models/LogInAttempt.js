import mongoose from "mongoose";

    const LogInSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        immuatble:true,//cannot be changed
        trim:true,
        match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters are allowed"]
    },
    successfullLogin:{
        type:Boolean,
        required:true,
        immutable:true
    },
    IPadress:{
        type: String,
        required: true,
        immutable: true
    },
    TimeStamp:{ 
        type:Date,
        default: Date.now,
        immutable:true,
       // expires: '7d', // Token expires in 7 days
    },

    //userType: {
    //    type: String,
   //     required: true,
    //    enum: ['Customer', 'Employee']
   // }

    },
);


export default mongoose.model("LogInAttempt",LogInSchema); 
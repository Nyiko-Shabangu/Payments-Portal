import mongoose from "mongoose";


    const LogInSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        immuatble:true
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
        immutable:true
    }

    });

export default mongoose.model("LogInAttempt",LogInSchema); 
import mongoose from 'mongoose';

const postSchema =  new mongoose.Schema({
    tilte:{
        type:string,
        required:true,
        unique:true
    },
    postImage:{
        type:string,
        required:true,
        trim:true,
        default:"image URL"

    },
    content:{
        type:string,
        required:true,
        minlength:5,
        maxlength:20000 
    },
    category:{          
        type:true,
        required:true,
        enum: ["Pending, technology, healt, entertainement"],
        default: "Pending"
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        immutable: true

    }


})

export default mongoose.model("Post",postSchema);
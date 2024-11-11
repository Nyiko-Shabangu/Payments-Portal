import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const ATLAS_URI = process.env.ATLAS_URI;

const connectionDB = async() => {
    try {
        await mongoose.connect(ATLAS_URI);
        console.log(`Succesfully connected to ${ATLAS_URI}`);
    }catch (err){

        console.log(`Failed to connect to ${ATLAS_URI}:${err}`);
        console.log(`Trying to connect to ${MONGO_URI}:${err}`);
        try{
            await mongoose.connect(MONGO_URI);
            console.log(`Succesfully connected to ${MONGO_URI}`);
        }catch (err){
            console.log(`Failed to connect to ${MONGO_URI}:${err}`);
            process.exit(1);
        }
    }

}

export default connectionDB;
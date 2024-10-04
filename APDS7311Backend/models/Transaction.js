import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    /*userUsername:{
        type:String,
        required :true
    },*/
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    accountnumber: {
        type: String,
        required: true
    },
    swiftcode: {
        type: String,
        required: true
    }

});

export default mongoose.model("Transaction", transactionSchema);
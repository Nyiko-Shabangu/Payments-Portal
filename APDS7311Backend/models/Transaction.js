import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userUsername:{
        type:String,
        trim: true,
        required :true
    },
    amount: {
        type: String,
        trim: true,
        required: true,
        match: [/^[0-9]+$/, "Only numeric characters are allowed."] // Allows only numbers
    },
    currency: {
        type: String,
        trim: true,
        required: true // Only alphanumeric characters are allowed
    },
    provider: {
        type: String,
        trim: true,
        required: true,
        match: [/^[a-zA-Z]+$/, "Only alphabetical characters are allowed."] // Only alphanumeric characters are allowed
    },
    accountnumber: {
        type: String,
        trim: true,
        required: true,
        match: [/^[0-9]+$/, "Only numeric characters are allowed."] // Allows only numbers
    },
    swiftcode: {
        type: String,
        trim: true,
        required: true
    }

});


// Method to update payment status
//paymentSchema.methods.verifyPayment = function (employeeId) {
    //this.paymentStatus = 'Verified';
  //  this.verifiedBy = employeeId;
//    this.verifiedAt = Date.now();
 // };
  
//  const Payment = mongoose.model('Payment', paymentSchema);

export default mongoose.model("Transaction", transactionSchema);
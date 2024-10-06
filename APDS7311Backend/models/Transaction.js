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


// Method to update payment status
//paymentSchema.methods.verifyPayment = function (employeeId) {
    //this.paymentStatus = 'Verified';
  //  this.verifiedBy = employeeId;
//    this.verifiedAt = Date.now();
 // };
  
//  const Payment = mongoose.model('Payment', paymentSchema);

export default mongoose.model("Transaction", transactionSchema);
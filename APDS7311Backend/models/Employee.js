import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      default: 'Employee', // Could have roles like Admin, Verifier, etc.
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Similar password hashing and verification for employee accounts
  employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  const Employee = mongoose.model('Employee', employeeSchema);
  module.exports = Employee;
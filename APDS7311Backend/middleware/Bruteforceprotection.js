import mongoose from 'mongoose';
import express from 'express';
import ExpressBrute from 'express-brute';
import MongooseStore from 'express-brute-mongoose';
import rateLimit from 'express-rate-limit';

const bruteforceSchema = new mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date
    },
    expires: { type: Date, index: { expires: '24h' }} // TTL index
});

// Create the model for brute force protection
const BruteforceModel = mongoose.model('Bruteforce', bruteforceSchema);
const store = new MongooseStore(BruteforceModel);

// Configure brute force protection
const Bruteforceprotection = new ExpressBrute(store, {
    freeRetries: 115,
    minWait: 1000 * 60 * 10, // 10 minutes
    maxWait: 1000 * 60 * 60, // 1 hour
    failCallback: function (req, res, next) {
        res.status(429).json({ 
            msg: 'Too many requests, please try again later', 
            nextDate: new Date(Date.now() + 1000 * 60 * 10) // Retry time in 10 minutes
        });
    }
});

// Define the rate limit rule: max 5 requests per 15 minutes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    handler: (req, res) => {
        res.status(429).json({
            message: "Too many requests from this IP, please try again after 15 minutes."
        });
    }
});

// Export both middleware functions
export { Bruteforceprotection, apiLimiter };


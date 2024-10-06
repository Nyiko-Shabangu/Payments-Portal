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
    expires: { type: Date, index: { expires: '24h' } }
});

const Bruteforcemodel = mongoose.model('Bruteforce', bruteforceSchema); //this is the model for the bruteforce protection

const store = new MongooseStore(Bruteforcemodel);

const bruteforce = new ExpressBrute(store,
    {
        freeRetries: 10,
        minWait: 1000 * 60 * 10,//10 minutes
        maxWait: 1000 * 60 * 60,//1 hour
        failCallback: function (req, res, next) {
            res.status(429).json({ msg: 'Too many requests, please try again later' , nextDate: NextDate}); //nextDate is the date of the next request
        }
    });


    export default bruteforce;





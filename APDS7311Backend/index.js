import './config.js';
import express from 'express';
import cors from 'cors';
import https from 'https';
import helmet from 'helmet';
import fs from 'fs';
import morgan from 'morgan';
import connectionDB from './database/connection.js';
import authRoutes from './Routes/auth.js'; 
import postRoutes from './Routes/Post.js';
import rateLimit from 'express-rate-limit'; // Changed this line

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectionDB();

// Define the rate limit rule: max 100 requests per 15 minutes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes."
});

// Middleware
app.use(express.json());
app.use(helmet()); // API security
app.use(morgan('combined')); // Logging
app.use(cors({ origin: 'http://localhost:3000' })); // Cross-Origin Resource Sharing

// Routes
app.use('/api', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', apiLimiter); // Apply the rate limiter to all routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
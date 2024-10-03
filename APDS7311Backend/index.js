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







const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectionDB();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({ origin: 'http://localhost:3000' }));
// Routes
app.use('/api', postRoutes);
app.use('/api/auth', authRoutes);

// // SSL options
// const options = {
//     key: fs.readFileSync('keys/privatekey.pem'),
//     cert: fs.readFileSync('keys/certificate.pem')
// };

 //Create HTTPS server
// https.createServer(options, app).listen(PORT, () => {
//     console.log(`Server is running on https://localhost:${PORT}`);
// });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err); // Log the error
    res.status(500).json({ message: 'Internal server error', error: err.message });
});
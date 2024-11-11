import './config.js';
import express from 'express';
import cors from 'cors';
import https from 'https';
import helmet from 'helmet';
import fs from 'fs';
import morgan from 'morgan';
import connectionDB from './database/connection.js';
import authRoutes from './Routes/auth.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectionDB();

// General error message
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

// Middleware
app.use(express.json());

//https://helmetjs.github.io/
// Helmet configuration for security
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], //
            scriptSrc: ["'self'", "https://localhost:3000"], // 
            objectSrc: ["'none'"], // 
            upgradeInsecureRequests: [], 
        },
    },
    frameguard: {
        action: 'SAMEORIGIN', 
    },
    referrerPolicy: {
        policy: 'no-referrer', 
    },
    xssFilter: true, 
}));

app.use(morgan('combined')); // Logging
app.use(cors({ origin: 'http://localhost:3000' })); // Cross-Origin Resource Sharing

// Routes
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only send over HTTPS
      sameSite: 'Strict', // restrict cookies to same-site
    });
    next();
  });

  app.use((req, res, next) => {
    if (req.protocol === 'http') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });


// Read the certificate and key files
const sslOptions = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
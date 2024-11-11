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

// Middleware
app.use(express.json());

//https://helmetjs.github.io/
// Basic Helmet security setup with some custom configurations
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"]
  }
}));
app.use(helmet.xssFilter());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());


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
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';
import Transaction from '../models/Transaction.js';
import {Bruteforceprotection, apiLimiter } from '../middleware/Bruteforceprotection.js';

const router = express.Router();
const JWM_Secret = process.env.JWMSecret;


//Post (process) transaction 
router.post('/transaction',async (req,res) => {
try{

  //retrieve user inputs
   const {selectedOptionProvider,selectedOptionCurrency,accountnumber,amount,swiftcode,userName} =req.body; 

    //if fields are empty return error
    if (!selectedOptionProvider || !selectedOptionCurrency || !accountnumber || !amount || !swiftcode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    //if all inputs are validate post transaction through newTransaction schema
   const newTransaction = new Transaction({  provider:selectedOptionProvider, currency:selectedOptionCurrency,accountnumber:accountnumber, amount:amount,swiftcode:swiftcode,userUsername:userName});
    
   await newTransaction.save();

   //retrub successfull
   return res.status(201).json({ message: 'Successfully registered' });

   //catch if error occurs
}catch (err) {
    console.error('Error during Processing:', err); 
    return res.status(500).json({ message: 'Internal service error', error: err.message });
}
});

// login with brute force protection and API limiter
router.post('/login', apiLimiter, Bruteforceprotection.prevent, async (req, res) => {
    try {

      //retrieve user inputs
      const { username, password,accountnumber } = req.body;
   
      //if any fields are empty 
      if (!username || !password || !accountnumber) {
        return res.status(400).json({ message: 'Please provide username, password, and account number' });
      }

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
      
        await Bruteforceprotection.getMiddleware({ key: req.ip })(req, res, () => {});        
        await axios.post('http://localhost:5000/api/auth/log-login-attempt', {
          username,
          successfullLogin: false,
          IPadress
        });

        return res.status(400).json({ message: 'User not found' });
      }  
  
      if (user.accountNumber !== accountnumber) {
        await Bruteforceprotection.getMiddleware({ key: req.ip })(req, res, () => {});
        await axios.post('http://localhost:5000/api/auth/log-login-attempt', {
          username,
          successfullLogin: false,
          IPadress
        });
        return res.status(400).json({ message: 'Account number does not match' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
  
      //Bruteforceprotection.reset(req)
      //Extract user role and username
      const userRole = user.role;
      const userName = user.username;
  
      // Create /sign JWT token
      const token = jwt.sign({ id: user._id }, JWM_Secret, { expiresIn: '1h' });

      //return JWT, token, user role, username to frontend
      return res.status(200).json({ message: 'Login successful', token, userRole, userName });

    } catch (error) {
      // Log the error and return a 500 status code with a general message
      console.error('Error occurred during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

const JWM = process.env.JWMSecret;


// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the header

  if (!token) return res.sendStatus(401); // Unauthorized if no token is provided

  jwt.verify(token, JWM, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden if token is invalid
      req.user = user; // Attach user information to the request
      next(); // Proceed to the next middleware or route handler
  });
};

router.post('/verify-token', authenticateToken, (req, res) => {
  // If the token is valid, this code will execute
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

// Log a login attempt (for logging purposes)
router.post('/log-login-attempt', async (req, res) => {
  const { username, successfullLogin, IPadress } = req.body;

 try {
     const logInAttempt = new LogInAttempt({
         username,
         successfullLogin,
         IPadress
     });

     await logInAttempt.save();
     res.status(201).json({ msg: 'Login attempt logged' });
  } catch (error) {
     console.error(error.message);
     res.status(500).send('Server error');
  }
});

//Admin retrieve all transactions
router.get('/allTransactions', async (req, res) => {
  try {
      const transactions = await Transaction.find();
      res.json(transactions);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});


    //employee login    
    //router.post('/employee-login', bruteforceProtection, async (req, res) => {
       // const { username, password } = req.body;
    
      //  try {
       //     const employee = await Employee.findOne({ username });
       //     if (!employee) {
      //          return res.status(400).json({ msg: 'Invalid credentials' });
       //     }
    
        //    const isMatch = await bcrypt.compare(password, employee.password);
        //    if (!isMatch) {
        //          return res.status(400).json({ msg: 'Invalid credentials' });
        //     }
    
            // Generate JWT for employee
            //const token = jwt.sign({ employeeId: employee._id, role: employee.role }, 'yourSecretKey', { expiresIn: '1h' });
            //res.json({ token });
        //} catch (error) {
           // console.error(error.message);
            //res.status(500).send('Server error');   
        //}
   //}); 


/*
router.post('/registration', async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body
        const { name,surname,username,idNumber,accountNumber, password } = req.body;

        // Check if all fields are provided
        if (!name || !surname || !username || !idNumber || !accountNumber || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
      
        const existingUser = await User.findOne({ $or: [{ username }] });

        // Check if the user exists
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        //salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   

        const userRole ='Client';
        // Create and save the new user
        const newUser = new User({ name,surname,username,idNumber,accountNumber, password: hashedPassword,role: userRole});
        await newUser.save();

        // Successful registration response
        return res.status(201).json({ message: 'Successfully registered' });
    } catch (err) {
        console.error('Error during registration:', err); // Log the full error
        return res.status(500).json({ message: 'Internal service error', error: err.message });
    }
});

*/

export default router;
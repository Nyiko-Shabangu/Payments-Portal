import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Assuming this is where the User model is
import jwt from 'jsonwebtoken';
import Transaction from '../models/Transaction.js';
import bruteforceProtection from '../middleware/bruteforceProtection.js';
//import loginAttempt from '../middleware/Loginatemptauth.js';

const router = express.Router();
const JWM_Secret = process.env.JWMSecret;


router.post('/registration', async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body
        const { name,surname,username,idNumber,accountNumber, password } = req.body;

        // Check if all fields are provided
        if (!name || !surname || !username || !idNumber || !accountNumber || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
      
       /* const existingUser = await User.findOne({ $or: [{ username }, { name }] });

        // Check if the user exists
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }*/

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //salt
       // const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash(password, salt);   

        // Create and save the new user
        const newUser = new User({ name,surname,username,idNumber,accountNumber, password: hashedPassword });
        await newUser.save();

        // Successful registration response
        return res.status(201).json({ message: 'Successfully registered' });
    } catch (err) {
        console.error('Error during registration:', err); // Log the full error
        return res.status(500).json({ message: 'Internal service error', error: err.message });
    }
});



router.post('/transaction',async (req,res) => {
try{
   const {/*userUsername,*/amount,currency,provider,accountnumber,swiftcode} =req.body; 

   const newTransaction = new Transaction({/* userUsername,*/amount,currency,provider,accountnumber,swiftcode });
   await newTransaction.save();
   return res.status(201).json({ message: 'Successfully registered' });

}catch (err) {
    console.error('Error during registration:', err); // Log the full error
    return res.status(500).json({ message: 'Internal service error', error: err.message });
}
});






// login with brute force protection
router.post('/login' , bruteforceProtection.prevent , async (req,res) => {

    try {

        const {username,password} = req.body;

        const user = await User.findOne({ username});
        
        if(!user){
            return res.status(404).json({message:'User not found', error: err.message})
        }  

        //unsalt the password
        //const unsaltedPassword = await bcrypt.unsalt(password);
        
        
        //check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message:'Incorrect password', error: err.message})
        } 

       

        //create a token
        const token = jwt.sign({id:user._id}, JWM_Secret,{expiresIn: '1h'});

        res.json({token});
       // return res.status(201).json({message:'Successfull login', error: err.message})
    }catch(err){

        return res.status(500).json({message:'Failed to login', error: err.message})

    }



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

// Log a login attempt (for logging purposes)
//router.post('/log-login-attempt', async (req, res) => {
    //const { username, successfullLogin, IPadress } = req.body;

   // try {
     //   const logInAttempt = new LogInAttempt({
       //     username,
       //     successfullLogin,
      //      IPadress
      //  });

      //  await logInAttempt.save();
     //   res.status(201).json({ msg: 'Login attempt logged' });
    //} catch (error) {
    //    console.error(error.message);
    //    res.status(500).send('Server error');
    //}




}) 


router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});









export default router;
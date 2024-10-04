import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Assuming this is where the User model is
import jwt from 'jsonwebtoken';
import Transaction from '../models/Transaction.js';
//import bruteforce from '';


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







router.post('/login',async (req,res) => {

    try {

        const {username,password} = req.body;

        const user = await User.findOne({ username});
        
        if(!user){
            return res.status(201).json({message:'User not found', error: err.message})
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(201).json({message:'User not found', error: err.message})
        } 



        const token = jwt.sign({id:user._id}, JWM_Secret,{expiresIn: '1h'});

        res.json({token});
       // return res.status(201).json({message:'Successfull login', error: err.message})
    }catch(err){

        return res.status(400).json({message:'Failed to login', error: err.message})

    }




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
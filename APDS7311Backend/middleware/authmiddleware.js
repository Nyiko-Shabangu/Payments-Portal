import jwt from 'jsonwebtoken';
import LogInAttempt from '../models/LogInAttempt.js';

const jwtsecretkey = process.env.JWT_SECRET_KEY;

const authmiddleware = async (req, res, next) => {

    console.log("headers",req.headers); //this is the headers object that contains the authorization key
    const token = req.headers.authorization; //this is the token that is sent from the frontend
    console.log('auth header',authheader); //this is the auth header that is sent from the frontend


    if (!authheader) {
        return res.status(401).json({ msg: 'No auth header, authorization denied' });
    }

    const parts = authheader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Invalid token format, authorization denied' });
    }

    const tokens = parts[1];
    console.log('tokens',tokens);

    if(!tokens){
        return res.status(401).json({ msg: 'Invalid token format, authorization denied' });
    }

    try {
        const decoded = jwt.verify(tokens, jwtsecretkey); //this is the decoded token

        const employeeId = decoded.employeeId;
        const userId = decoded.userId;

        if(decoded.role === 'employee'){

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(401).json({ msg: 'Employee not found' });
        }

        req.employee = employee; 
    

     } else if(decoded.role === 'customer'){

            const customer = await Customer.findById(customerId);

            if (!customer) {
                return res.status(401).json({ msg: 'Customer not found' });
            }

            req.customer = customer;
           
        } 
        
        else {
            return res.status(401).json({ msg: 'Invalid token format, authorization denied' });
        }

         next();
    } catch (error) { //this is the error object that is sent from the jwt.verify function
        console.error(error.message);
        if(error.message === 'jwt expired'){
            return res.status(401).json({ msg: 'Token expired, authorization denied' });
        }else if(error.message === 'jwt malformed'){
            return res.status(401).json({ msg: 'Invalid token format, authorization denied' });
        }else if(error.message === 'invalid token'){
            return res.status(401).json({ msg: 'Invalid token, authorization denied' });
        }else if(error.message === 'invalid signature'){
            return res.status(401).json({ msg: 'Invalid signature, authorization denied' });
        }else if(error.message === 'jwt must be provided'){
            return res.status(401).json({ msg: 'No auth header, authorization denied' });
        }else if(error.message === 'jwt secret key is not defined'){
            return res.status(500).json({ msg: 'Server error' });
        }
        }
    


//backup code
   // try {
   //     const decoded = jwt.verify(token, 'yourSecretKey');
   //     const employeeId = decoded.employeeId;
   //     const employee = await Employee.findById(employeeId);
   //     if (!employee) {
        //    return res.status(401).json({ msg: 'Employee not found' });
        //}

      //  req.employee = employee;
      //  next();
    //} catch (error) {
    //    console.error(error.message);
    //    res.status(500).send('Server error');
    //}
};

export default authmiddleware;


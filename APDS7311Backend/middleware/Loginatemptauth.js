import loginAttemptSchema from '../models/LogInAttempt';


export const loginAttempt = async (req, res, next) => {
    const originalJson = res.json;
    res.json = async function (data) {
      
        const username= req.body.username;
        const successfullLogin= !data.message || data.message !=='Incorrect password';
        const IPAdress= req.ip||req.socket.remoteAddress;

        loginAttemptSchema.create({username, successfullLogin, IPAdress}).catch((error)=>{
            console.log('Error creating login attempt',error);
        });
        originalJson.call(this, data);
    };
    next();
};

export default loginAttempt;

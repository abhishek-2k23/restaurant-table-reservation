import User from "../../models/user.js";
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    try{
        const {email , password} = req.body;
        
        //check for all the details filled
        if(!email || !password){
            return res.status(404).json({
                status: false,
                message: 'Need all details'
            })
        }

        //check for the existing user
        const alreadyRegister = await User.findOne({email})

        if(alreadyRegister){
            return res.status(402).json({
                status: false,
                message: 'email is registered',
            })
        }

        //encrypt password
        const encryptedPassword = await  bcrypt.hash(password, 10);

        //save user to the db
        const savedUser = await new User({
            id: email.replace("@gmail.com", ""), 
            email, 
            password: encryptedPassword
        }).save();

        return res.status(201).json({
            status: true,
            message: 'you are registered',
            user: savedUser
        })
    }catch(e){
        console.log('Error in registering user ', e.message)
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: e.message
        })
    }
}

export default register;
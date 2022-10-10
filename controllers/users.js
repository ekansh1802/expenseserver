import mongoose from 'mongoose';
import Users from '../models/users.js';
import transactionMessage from '../models/transactionMessage.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req,res) => {
    const { email, password, username } = req.body;

    try{
        //Checking if user already registered
        const existingUser = await Users.findOne({ email });
        if(existingUser){
            res.status(404).json({ message: 'Already registered' });
        }

        //Registering up the user
        //Hash password takes 2 arguements. 1st = password to be hashed and 2nd = difficulty level
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Users.create({ email, password: hashedPassword, username: username });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        res.status(200).json({ result: result, token });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        //Checking if user present or not
        const existingUser = await Users.findOne({ email });
        if(!existingUser){
            return res.status(404).json({ message: 'User is not available' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        //To generate jwt token 1st arguement = email and id and 2nd arguement = a secret string and 3rd = options object
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h"});
        res.status(200).json({ result: existingUser, token });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred' });
    }
}
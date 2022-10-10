import express from 'express';
import { registerUser, loginUser } from '../controllers/users.js';

const router = express.Router();

//To register User
router.post('/register', registerUser);

//To login User
router.post('/login', loginUser);

export default router;
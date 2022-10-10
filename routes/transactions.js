import express from 'express';
import { getTransactionsByUser, createTransaction, deleteTransaction } from '../controllers/transactions.js';

const router = express.Router();

//To get all the transactions by a user(Route will be different)
router.post('/byuser', getTransactionsByUser);

//To create a transaction
router.post('/', createTransaction);

//To delete a transaction
//Post request since we are passing data in req.body
router.post('/delete', deleteTransaction);

export default router;
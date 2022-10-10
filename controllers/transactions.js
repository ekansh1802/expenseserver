import mongoose from 'mongoose';
import transactionMessage from '../models/transactionMessage.js';

export const getTransactionsByUser = async (req, res) => {
    const { userId } = req.body;
    try{
        const transactions = await transactionMessage.find({ userId: userId });
        res.status(200).json(transactions);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred '});
    }
}

export const createTransaction = async (req, res) => {
    const transaction = req.body;
    const newTransaction = new transactionMessage(transaction);

    try{
        await newTransaction.save();
        res.status(200).json(newTransaction);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred' });
    }
}

export const deleteTransaction = async (req, res) => {
    //console.log(req.body);
    try{
        if(!mongoose.Types.ObjectId.isValid(req.body._id)){
            res.status(404).json({ message: 'No transaction present with this id '});
        }
        const existingTransaction = await transactionMessage.findById(req.body._id);
        if(existingTransaction.userId === req.body.userId){
            await transactionMessage.findByIdAndRemove(req.body._id);
            res.status(200).json({ message: 'Transaction deleted successfully' });
        }
        else{
            res.status(404).json({ message: "Cannot delete someone else's transaction"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred' });
    }
}
import mongoose from 'mongoose';

//Structure of each transaction
const transactionSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
});

const transactionMessage = mongoose.model('TRANSACTION MESSAGE MODEL', transactionSchema);

export default transactionMessage;
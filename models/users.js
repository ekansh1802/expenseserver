import mongoose from 'mongoose';

//Structure of each user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    createdAt: { 
        type: Date,
        default: new Date(),
    },
});

const Users = mongoose.model('USER MODEL', userSchema);

export default Users;
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import transactionRoutes from './routes/transactions.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//Starting route for every transaction
app.use('/transactions', transactionRoutes);

//Starting route for every user
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Server is running'});
})

const CONNECTION_URL = "mongodb+srv://ekansh:e12456840a@cluster0.yqaho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

//To avoid warnings
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT} and connected to the database`)))
.catch((error) => console.log(error.message));

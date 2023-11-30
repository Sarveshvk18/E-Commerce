const express = require('express');
const cors = require('cors');
const productsRouter = require('./products');
const usersRouter = require('./users');
const { connectDB } = require('./connection');
const app = express();

require('dotenv').config();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/products', productsRouter);
app.use('/login', usersRouter); 
PORT = 5007;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

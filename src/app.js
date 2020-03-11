const express = require('express');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const farmRouter = require('./routes/farm');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/farms', farmRouter);

module.exports = app;

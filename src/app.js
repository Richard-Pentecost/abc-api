const express = require('express');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);

module.exports = app;

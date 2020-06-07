const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const farmRouter = require('./routes/farm');
const dataRouter = require('./routes/data');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/login', authRouter);
app.use('/farms', farmRouter);
app.use('/farms/:farmId/data', dataRouter);

module.exports = app;

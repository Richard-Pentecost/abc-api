const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect(
  process.env.DATABASE_CONN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    app.listen(3000);
  }
);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', err => {
  console.log('Error connecting to mongo', err);
});

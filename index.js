const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect(
  process.env.DATABASE_CONN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    app.listen(process.env.PORT || 3000);
  }
);

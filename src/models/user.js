const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        this.password = hash;
        next();
      }
    });
  }
});

userSchema.methods.sanitise = function sanitise(user) {
  const { password, ...noPassword } = user.toObject();
  return noPassword;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

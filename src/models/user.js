const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('isemail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name must be provided'],
  },
  username: {
    type: String,
    required: [true, 'A username must be provided'],
  },
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
    required: [true, 'An email address is required'],
  },
  password: {
    type: String,
    validate: [p => p.length > 7, 'Password must be at least 8 characters long'],
    required: [true, 'A password is required'],
  },
  permissionLevel: {
    type: String,
    required: true,
  },
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


userSchema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({ email: value });
  return !emailCount;
}, 'Email already exists');

userSchema.path('username').validate(async (value) => {
  const usernameCount = await mongoose.models.User.countDocuments({ username: value });
  return !usernameCount;
}, 'Username already exists');

userSchema.methods.sanitise = function sanitise(user) {
  const { password, ...noPassword } = user.toObject();
  return noPassword;
};

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

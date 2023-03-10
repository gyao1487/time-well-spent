const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ['volunteer', 'charity'], // Add the two different user types
    },
    // Add properties specific to volunteers
    skills: {
      type: [String],
      required: function() {
        return this.userType === 'volunteer';
      },
    },
    // Add properties specific to charities
    charityName: {
      type: String,
      required: function() {
        return this.userType === 'charity';
      },
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};





const User = model('User', userSchema);

module.exports = User;
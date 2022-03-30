const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    username: { type: String, unique: true },
    interest: { type: String },
    avatar: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

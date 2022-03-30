const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  username: { type: String, unique: true },
  email: { type: mongoose.Schema.Types.String, required: true, ref: 'User' },
  phoneNumber: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'User',
  },
  interest: { type: String },
  picture: { type: String },
});
module.exports = mongoose.model('UserDetails', userDetailsSchema);

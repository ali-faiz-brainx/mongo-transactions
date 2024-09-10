const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  balance: Number,
});

module.exports = mongoose.model('Account', accountSchema);

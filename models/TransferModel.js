const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
});

module.exports = mongoose.model('Transfer', transferSchema);

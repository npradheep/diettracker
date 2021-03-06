const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dietSchema = new Schema({
  username: { type: String, required: true },
  food: { type: String, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Diet = mongoose.model('Diet', dietSchema);

module.exports = Diet;
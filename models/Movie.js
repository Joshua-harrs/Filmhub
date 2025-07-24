const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  poster: String,
  trailer: String
});

module.exports = mongoose.model('Movie', movieSchema);

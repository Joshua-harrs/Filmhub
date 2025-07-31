const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    description: String,
    fileUrl: String,
    uploadedBy: String
});

module.exports = mongoose.model('Movie', MovieSchema);
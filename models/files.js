const mongoose = require('mongoose');

const mediaFileSchema = new mongoose.Schema({
  id: { type: String },
  originalname: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  size: { type: Number }
});

const MediaFile = mongoose.model('MediaFile', mediaFileSchema);

exports.MediaFile = MediaFile;
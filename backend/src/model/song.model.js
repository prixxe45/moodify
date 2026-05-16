const e = require('express');
const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["happy", "sad", "surprised", "neutral"],
      message: 'enum this is'
    }
  },
});

const songModel = mongoose.model('songs', SongSchema);
module.exports = songModel;
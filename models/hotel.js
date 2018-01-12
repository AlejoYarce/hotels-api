'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  amenities: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Hotel', HotelSchema);

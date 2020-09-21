const { Schema, model } = require('mongoose')

const schema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  date: {
    type: String,
  },
  number: {
    type: String,
  },
  died: {
    type: String,
  },
  injured: {
    type: String,
  },
  info: { type: Object },
})

module.exports = model('Accident', schema)

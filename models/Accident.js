const { Schema, model } = require('mongoose')

const schema = new Schema({
  location: {
    type: String,
  },
  date: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
  },
  died: {
    type: String,
  },
  injured: {
    type: String,
  },
  info: { type: Object },
  type: {
    type: String,
  },
  geometry: {
    type: Object,
  },
})

module.exports = model('Accident', schema)

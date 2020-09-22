const { Schema, model } = require('mongoose')

const schema = new Schema({
  location: {
    type: String,
  },
  date: {
    type: Date,
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
  properties: { type: Object },
  type: {
    type: String,
  },
  geometry: {
    type: Object,
  },
})

module.exports = model('Accident', schema)

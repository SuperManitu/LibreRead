const mongoose = require('mongoose')

const Book = new mongoose.Schema({
  email: String,
  list: []
})

module.exports = mongoose.model('Book', Book)

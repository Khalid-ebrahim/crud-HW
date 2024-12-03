const mongoose = require("mongoose")
const dogSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
})

const Dog = mongoose.model("Dog", dogSchema)
module.exports = Dog
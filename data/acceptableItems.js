const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true }
});


  const AcceptableItem = mongoose.model('AcceptableItem', itemSchema);
  module.exports = AcceptableItem;
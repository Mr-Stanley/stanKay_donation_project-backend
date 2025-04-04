const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
//   charityName: { type: String, required: true },
  donationDate: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
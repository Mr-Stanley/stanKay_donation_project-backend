const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    minlength: [3, 'Location must be at least 3 characters long'],
    maxlength: [100, 'Location must be less than 100 characters']
  },
  charityName: {
    type: String,
    required: [true, 'Charity name is required'],
    minlength: [2, 'Charity name must be at least 2 characters long'],
    maxlength: [100, 'Charity name must be less than 100 characters']
  },
  donationDate: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
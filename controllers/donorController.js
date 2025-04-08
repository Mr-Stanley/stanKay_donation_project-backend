const Donation = require('../models/donation');
const { getAcceptableItems } = require('../data/acceptableItems');

const donorController = {
  async submitDonation(req, res, next) {
    const fakeAuth = (req, res, next) => {
      req.user = { _id: 'fakeUserId', role: 'donor' }; // Replace with real auth later
      next();
    };
    app.use(fakeAuth); 
    // For now, assume donor is authenticated (fakeAuth sets req.user)
    if (req.user?.role !== 'donor') {
      return res.status(403).json({ error: 'Donor access required' });
    }
    const { itemName, location, charityName } = req.body;
    const acceptableItems = getAcceptableItems();

    // Check if item is acceptable
    const isValidItem = acceptableItems.some(item => item.name.localeCompare(itemName, undefined, {sensitivity: 'base'}) === 0 );
    if (!isValidItem) {
      return res.status(400).json({ error: 'Item not in acceptable list' });
    }

    if (!itemName || !location || !charityName) {
      return res.status(400).json({ error: 'All fields (itemName, location, charityName) are required' });
    }

    try {
      const donation = new Donation({
        itemName,
        donor: req.user._id, // Will be set by auth middleware; fakeAuth needs an _id for now
        location,
        charityName
      });
      await donation.save();
      res.status(201).json({ message: 'Donation submitted successfully', donation });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit donation', details: error.message });
    }
  }
};

module.exports = donorController;
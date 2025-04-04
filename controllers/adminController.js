const Donation = require('../models/donation');

const {getAcceptableItems, addAcceptableItems} = require('../data/acceptableItems');


const adminController = {
    async viewAllDonations(req, res) {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      try {
        const donations = await Donation.find().populate('donor', 'name email');
        res.json({ donations });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch donations', details: error.message });
      }
    },
  
    async getAcceptableItems(req, res) {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const items = getAcceptableItems();
      res.json({ acceptableItems: items });
    },
  
    async addAcceptableItem(req, res) {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const { name, category } = req.body;
      if (!name || !category) {
        return res.status(400).json({ error: 'Name and category are required' });
      }
      const updatedItems = addAcceptableItem({ name, category });
      res.status(201).json({ message: 'Item added', acceptableItems: updatedItems });
    }
  };
  
  module.exports = adminController;
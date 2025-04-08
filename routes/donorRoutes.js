const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

// Temporary middleware to simulate a donor user
const Authenticate = (req, res, next) => {
  req.user = { role: 'donor', _id: '507f1f77bcf86cd799439011' }; // Hardcoded _id for testing
  next();
};

router.post('/donations', Authenticate, donorController.submitDonation);

module.exports = router;
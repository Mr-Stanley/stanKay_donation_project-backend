const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Temporary middleware to simulate an admin user (replace with real auth later)
const Authenticate = (req, res, next) => {
  req.user = { role: 'admin' }; // Pretend this is an admin for testing
  next();
};

router.get('/donations', Authenticate, adminController.viewAllDonations);
router.get('/acceptable-items', Authenticate, adminController.getAcceptableItems);
router.post('/acceptable-items', Authenticate, adminController.addAcceptableItem);

module.exports = router;
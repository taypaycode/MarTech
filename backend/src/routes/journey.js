const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journey.controller');

// Get customer journey mapping
router.get('/', journeyController.getJourneyMaps);

// Get specific customer journey by ID
router.get('/:journeyId', journeyController.getJourneyById);

// Get touchpoints for a specific customer
router.get('/customer/:customerId', journeyController.getCustomerTouchpoints);

// Create a new journey map configuration
router.post('/', journeyController.createJourneyMap);

module.exports = router; 
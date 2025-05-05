const express = require('express');
const router = express.Router();
const attributionController = require('../controllers/attribution.controller');

// Get attribution models
router.get('/', attributionController.getAttributionModels);

// Get attribution for a specific campaign
router.get('/campaign/:campaignId', attributionController.getCampaignAttribution);

// Apply custom attribution model
router.post('/custom', attributionController.applyCustomModel);

// Get multi-touch attribution report
router.get('/report', attributionController.getAttributionReport);

module.exports = router; 
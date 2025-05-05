const express = require('express');
const router = express.Router();
const roiController = require('../controllers/roi.controller');

// Get ROI forecasts
router.get('/', roiController.getROIForecasts);

// Get ROI forecast by ID
router.get('/:forecastId', roiController.getROIForecastById);

// Create a new ROI forecast
router.post('/', roiController.createROIForecast);

// Get ROI forecast for a specific campaign
router.get('/campaign/:campaignId', roiController.getCampaignROIForecast);

// Run predictive ROI analysis
router.post('/predict', roiController.runPredictiveAnalysis);

module.exports = router; 
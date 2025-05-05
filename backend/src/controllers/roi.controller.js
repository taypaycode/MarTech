const roiService = require('../services/roi.service');

/**
 * Get all ROI forecasts
 */
exports.getROIForecasts = async (req, res) => {
  try {
    const forecasts = await roiService.getROIForecasts();
    res.json(forecasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get ROI forecast by ID
 */
exports.getROIForecastById = async (req, res) => {
  try {
    const { forecastId } = req.params;
    const forecast = await roiService.getROIForecastById(forecastId);
    
    if (!forecast) {
      return res.status(404).json({ error: 'Forecast not found' });
    }
    
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new ROI forecast
 */
exports.createROIForecast = async (req, res) => {
  try {
    const forecastData = req.body;
    const newForecast = await roiService.createROIForecast(forecastData);
    
    res.status(201).json(newForecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get ROI forecast for a specific campaign
 */
exports.getCampaignROIForecast = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { timeframe } = req.query;
    
    const forecast = await roiService.getCampaignROIForecast(campaignId, timeframe);
    
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Run predictive ROI analysis
 */
exports.runPredictiveAnalysis = async (req, res) => {
  try {
    const { campaigns, parameters } = req.body;
    
    const analysis = await roiService.runPredictiveAnalysis(campaigns, parameters);
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
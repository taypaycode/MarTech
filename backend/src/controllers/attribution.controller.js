const attributionService = require('../services/attribution.service');

/**
 * Get all attribution models
 */
exports.getAttributionModels = async (req, res) => {
  try {
    const models = await attributionService.getAttributionModels();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get attribution for a specific campaign
 */
exports.getCampaignAttribution = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const attribution = await attributionService.getCampaignAttribution(campaignId);
    res.json(attribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Apply custom attribution model
 */
exports.applyCustomModel = async (req, res) => {
  try {
    const { modelConfig, campaignIds } = req.body;
    const results = await attributionService.applyCustomModel(modelConfig, campaignIds);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get multi-touch attribution report
 */
exports.getAttributionReport = async (req, res) => {
  try {
    const { startDate, endDate, channels } = req.query;
    const report = await attributionService.getAttributionReport(startDate, endDate, channels);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
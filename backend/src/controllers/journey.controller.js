const journeyService = require('../services/journey.service');

/**
 * Get all journey maps
 */
exports.getJourneyMaps = async (req, res) => {
  try {
    const journeyMaps = await journeyService.getJourneyMaps();
    res.json(journeyMaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get journey by ID
 */
exports.getJourneyById = async (req, res) => {
  try {
    const { journeyId } = req.params;
    const journey = await journeyService.getJourneyById(journeyId);
    
    if (!journey) {
      return res.status(404).json({ error: 'Journey not found' });
    }
    
    res.json(journey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get customer touchpoints
 */
exports.getCustomerTouchpoints = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { startDate, endDate } = req.query;
    
    const touchpoints = await journeyService.getCustomerTouchpoints(
      customerId,
      startDate,
      endDate
    );
    
    res.json(touchpoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new journey map
 */
exports.createJourneyMap = async (req, res) => {
  try {
    const journeyMapData = req.body;
    const newJourneyMap = await journeyService.createJourneyMap(journeyMapData);
    
    res.status(201).json(newJourneyMap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
const segmentationService = require('../services/segmentation.service');

/**
 * Get all segments
 */
exports.getAllSegments = async (req, res) => {
  try {
    const segments = await segmentationService.getAllSegments();
    res.json(segments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get segment by ID
 */
exports.getSegmentById = async (req, res) => {
  try {
    const { segmentId } = req.params;
    const segment = await segmentationService.getSegmentById(segmentId);
    
    if (!segment) {
      return res.status(404).json({ error: 'Segment not found' });
    }
    
    res.json(segment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new segment
 */
exports.createSegment = async (req, res) => {
  try {
    const segmentData = req.body;
    const newSegment = await segmentationService.createSegment(segmentData);
    
    res.status(201).json(newSegment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update a segment
 */
exports.updateSegment = async (req, res) => {
  try {
    const { segmentId } = req.params;
    const segmentData = req.body;
    
    const updatedSegment = await segmentationService.updateSegment(segmentId, segmentData);
    
    if (!updatedSegment) {
      return res.status(404).json({ error: 'Segment not found' });
    }
    
    res.json(updatedSegment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a segment
 */
exports.deleteSegment = async (req, res) => {
  try {
    const { segmentId } = req.params;
    
    const result = await segmentationService.deleteSegment(segmentId);
    
    if (!result) {
      return res.status(404).json({ error: 'Segment not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Run AI-powered segmentation
 */
exports.runAISegmentation = async (req, res) => {
  try {
    const { parameters, dataSource } = req.body;
    
    const segments = await segmentationService.runAISegmentation(parameters, dataSource);
    
    res.json(segments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
const express = require('express');
const router = express.Router();
const segmentationController = require('../controllers/segmentation.controller');

// Get all segments
router.get('/', segmentationController.getAllSegments);

// Get specific segment by ID
router.get('/:segmentId', segmentationController.getSegmentById);

// Create a new segment
router.post('/', segmentationController.createSegment);

// Update a segment
router.put('/:segmentId', segmentationController.updateSegment);

// Delete a segment
router.delete('/:segmentId', segmentationController.deleteSegment);

// Run AI-powered segmentation
router.post('/ai-analysis', segmentationController.runAISegmentation);

module.exports = router; 
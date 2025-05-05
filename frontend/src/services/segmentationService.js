import api from './api';

/**
 * Get all segments
 */
export const getAllSegments = async () => {
  const response = await api.get('/segmentation');
  return response.data;
};

/**
 * Get segment by ID
 */
export const getSegmentById = async (segmentId) => {
  const response = await api.get(`/segmentation/${segmentId}`);
  return response.data;
};

/**
 * Create a new segment
 */
export const createSegment = async (segmentData) => {
  const response = await api.post('/segmentation', segmentData);
  return response.data;
};

/**
 * Update a segment
 */
export const updateSegment = async (segmentId, segmentData) => {
  const response = await api.put(`/segmentation/${segmentId}`, segmentData);
  return response.data;
};

/**
 * Delete a segment
 */
export const deleteSegment = async (segmentId) => {
  await api.delete(`/segmentation/${segmentId}`);
  return true;
};

/**
 * Run AI-powered segmentation
 */
export const runAISegmentation = async (parameters, dataSource) => {
  const response = await api.post('/segmentation/ai-analysis', { parameters, dataSource });
  return response.data;
}; 
import api from './api';

/**
 * Get all journey maps
 */
export const getJourneyMaps = async () => {
  const response = await api.get('/journey');
  return response.data;
};

/**
 * Get journey by ID
 */
export const getJourneyById = async (journeyId) => {
  const response = await api.get(`/journey/${journeyId}`);
  return response.data;
};

/**
 * Get customer touchpoints
 */
export const getCustomerTouchpoints = async (customerId, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const response = await api.get(`/journey/customer/${customerId}?${params.toString()}`);
  return response.data;
};

/**
 * Create a new journey map
 */
export const createJourneyMap = async (journeyMapData) => {
  const response = await api.post('/journey', journeyMapData);
  return response.data;
}; 
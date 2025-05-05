import api from './api';

/**
 * Get all ROI forecasts
 */
export const getROIForecasts = async () => {
  const response = await api.get('/roi');
  return response.data;
};

/**
 * Get ROI forecast by ID
 */
export const getROIForecastById = async (forecastId) => {
  const response = await api.get(`/roi/${forecastId}`);
  return response.data;
};

/**
 * Create a new ROI forecast
 */
export const createROIForecast = async (forecastData) => {
  const response = await api.post('/roi', forecastData);
  return response.data;
};

/**
 * Get ROI forecast for a specific campaign
 */
export const getCampaignROIForecast = async (campaignId, timeframe) => {
  const params = new URLSearchParams();
  if (timeframe) {
    params.append('timeframe', JSON.stringify(timeframe));
  }
  
  const response = await api.get(`/roi/campaign/${campaignId}?${params.toString()}`);
  return response.data;
};

/**
 * Run predictive ROI analysis
 */
export const runPredictiveAnalysis = async (campaigns, parameters) => {
  const response = await api.post('/roi/predict', { campaigns, parameters });
  return response.data;
}; 
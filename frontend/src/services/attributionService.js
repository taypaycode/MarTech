import api from './api';

/**
 * Get all attribution models
 */
export const getAttributionModels = async () => {
  const response = await api.get('/attribution');
  return response.data;
};

/**
 * Get attribution for a specific campaign
 */
export const getCampaignAttribution = async (campaignId) => {
  const response = await api.get(`/attribution/campaign/${campaignId}`);
  return response.data;
};

/**
 * Apply custom attribution model
 */
export const applyCustomModel = async (modelConfig, campaignIds) => {
  const response = await api.post('/attribution/custom', { modelConfig, campaignIds });
  return response.data;
};

/**
 * Get multi-touch attribution report
 */
export const getAttributionReport = async (startDate, endDate, channels) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (channels && channels.length) params.append('channels', channels.join(','));
  
  const response = await api.get(`/attribution/report?${params.toString()}`);
  return response.data;
}; 
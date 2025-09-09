/**
 * Vercel serverless function for specific ROI forecast by ID
 */

const forecastDetails = {
  'forecast1': {
    id: 'forecast1',
    name: 'Q3 2023 Marketing ROI Forecast',
    description: 'ROI forecast for Q3 marketing campaigns',
    timeframe: { start: '2023-07-01', end: '2023-09-30' },
    totalSpend: 250000,
    predictedRevenue: 1250000,
    predictedROI: 5.0,
    confidence: 0.85,
    channels: {
      'social': { spend: 75000, revenue: 412500, roi: 5.5 },
      'search': { spend: 100000, revenue: 550000, roi: 5.5 },
      'email': { spend: 25000, revenue: 125000, roi: 5.0 },
      'display': { spend: 50000, revenue: 162500, roi: 3.25 }
    },
    campaigns: [
      { id: 'camp1', name: 'Summer Sale', spend: 100000, revenue: 600000, roi: 6.0 },
      { id: 'camp2', name: 'Back to School', spend: 75000, revenue: 375000, roi: 5.0 },
      { id: 'camp3', name: 'Product Launch', spend: 50000, revenue: 200000, roi: 4.0 },
      { id: 'camp4', name: 'Brand Awareness', spend: 25000, revenue: 75000, roi: 3.0 }
    ],
    assumptions: {
      'conversionRate': 0.025,
      'averageOrderValue': 85,
      'customerRetention': 0.65
    },
    created: '2023-06-15T00:00:00Z',
    updated: '2023-06-15T00:00:00Z'
  },
  'forecast2': {
    id: 'forecast2',
    name: 'Holiday Season 2023 Forecast',
    description: 'ROI forecast for holiday marketing campaigns',
    timeframe: { start: '2023-11-01', end: '2023-12-31' },
    totalSpend: 500000,
    predictedRevenue: 3000000,
    predictedROI: 6.0,
    confidence: 0.82,
    channels: {
      'social': { spend: 150000, revenue: 900000, roi: 6.0 },
      'search': { spend: 200000, revenue: 1400000, roi: 7.0 },
      'email': { spend: 75000, revenue: 450000, roi: 6.0 },
      'display': { spend: 75000, revenue: 250000, roi: 3.33 }
    },
    campaigns: [
      { id: 'camp5', name: 'Black Friday', spend: 200000, revenue: 1400000, roi: 7.0 },
      { id: 'camp6', name: 'Cyber Monday', spend: 150000, revenue: 900000, roi: 6.0 },
      { id: 'camp7', name: 'Holiday Gift Guide', spend: 100000, revenue: 500000, roi: 5.0 },
      { id: 'camp8', name: 'Year-End Sale', spend: 50000, revenue: 200000, roi: 4.0 }
    ],
    assumptions: {
      'conversionRate': 0.035,
      'averageOrderValue': 110,
      'customerRetention': 0.60
    },
    created: '2023-05-20T00:00:00Z',
    updated: '2023-06-10T00:00:00Z'
  }
};

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { query, method } = req;
  const { forecastId } = query;

  try {
    if (method === 'GET') {
      const forecast = forecastDetails[forecastId];
      if (!forecast) {
        return res.status(404).json({ error: 'Forecast not found' });
      }
      return res.status(200).json(forecast);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Forecast API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


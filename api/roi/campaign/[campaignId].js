/**
 * Vercel serverless function for campaign ROI forecast
 */

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
  const { campaignId } = query;
  const { timeframe } = query;

  try {
    if (method === 'GET') {
      // Mock campaign ROI forecast data
      const campaignForecast = {
        campaignId,
        name: 'Summer Sale 2023',
        timeframe: timeframe ? JSON.parse(timeframe) : { start: '2023-07-01', end: '2023-09-30' },
        historicalData: {
          spend: 50000,
          impressions: 5000000,
          clicks: 150000,
          conversions: 3750,
          revenue: 300000,
          ctr: 0.03,
          conversionRate: 0.025,
          cpa: 13.33,
          roas: 6.0
        },
        forecast: {
          spend: 75000,
          predictedImpressions: 7500000,
          predictedClicks: 225000,
          predictedConversions: 5625,
          predictedRevenue: 450000,
          predictedCTR: 0.03,
          predictedConversionRate: 0.025,
          predictedCPA: 13.33,
          predictedROAS: 6.0
        },
        timeSeries: [
          { date: '2023-07-01', spend: 2500, revenue: 15000, roi: 6.0 },
          { date: '2023-07-08', spend: 2500, revenue: 16000, roi: 6.4 },
          { date: '2023-07-15', spend: 2500, revenue: 14500, roi: 5.8 },
          { date: '2023-07-22', spend: 2500, revenue: 15500, roi: 6.2 },
          { date: '2023-07-29', spend: 2500, revenue: 14000, roi: 5.6 }
        ]
      };

      return res.status(200).json(campaignForecast);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Campaign ROI forecast API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


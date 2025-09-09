/**
 * Vercel serverless function for attribution endpoints
 */

// Mock data for attribution models
const attributionModels = [
  { id: 'first_touch', name: 'First Touch Attribution', description: 'Credits the first touchpoint' },
  { id: 'last_touch', name: 'Last Touch Attribution', description: 'Credits the last touchpoint' },
  { id: 'linear', name: 'Linear Attribution', description: 'Distributes credit equally' },
  { id: 'time_decay', name: 'Time Decay Attribution', description: 'More recent touchpoints get more credit' },
  { id: 'position_based', name: 'Position Based Attribution', description: '40/20/40 credit for first, middle, and last' },
  { id: 'markov_chain', name: 'Markov Chain Attribution', description: 'Data-driven attribution model' }
];

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

  try {
    switch (method) {
      case 'GET':
        if (query.action === 'models') {
          return res.status(200).json(attributionModels);
        } else if (query.action === 'report') {
          const { startDate, endDate } = query;
          const report = {
            timeframe: { startDate, endDate },
            totalConversions: 5000,
            totalRevenue: 300000,
            channels: {
              'organic_search': { conversions: 1500, revenue: 90000, percentage: 30 },
              'paid_search': { conversions: 1250, revenue: 75000, percentage: 25 },
              'email': { conversions: 1000, revenue: 60000, percentage: 20 },
              'social': { conversions: 750, revenue: 45000, percentage: 15 },
              'direct': { conversions: 500, revenue: 30000, percentage: 10 }
            },
            campaigns: [
              { id: 'campaign1', name: 'Summer Sale', conversions: 2000, revenue: 120000 },
              { id: 'campaign2', name: 'Product Launch', conversions: 1500, revenue: 90000 },
              { id: 'campaign3', name: 'Holiday Promotion', conversions: 1000, revenue: 60000 },
              { id: 'campaign4', name: 'Brand Awareness', conversions: 500, revenue: 30000 }
            ]
          };
          return res.status(200).json(report);
        } else {
          return res.status(400).json({ error: 'Invalid action parameter' });
        }

      case 'POST':
        if (query.action === 'custom') {
          // Apply custom attribution model
          const { modelConfig, campaignIds } = req.body;
          const results = campaignIds.map(campaignId => ({
            campaignId,
            totalConversions: 1500,
            totalRevenue: 90000,
            attribution: {
              'organic_search': { conversions: 450, revenue: 27000, percentage: modelConfig.weights.organic_search || 30 },
              'paid_search': { conversions: 375, revenue: 22500, percentage: modelConfig.weights.paid_search || 25 },
              'email': { conversions: 300, revenue: 18000, percentage: modelConfig.weights.email || 20 },
              'social': { conversions: 225, revenue: 13500, percentage: modelConfig.weights.social || 15 },
              'direct': { conversions: 150, revenue: 9000, percentage: modelConfig.weights.direct || 10 }
            }
          }));
          return res.status(200).json(results);
        } else {
          return res.status(400).json({ error: 'Invalid action parameter' });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Attribution API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


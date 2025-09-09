/**
 * Vercel serverless function for campaign attribution
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

  try {
    if (method === 'GET') {
      // Mock campaign attribution data
      const campaignAttribution = {
        campaignId,
        totalConversions: 1250,
        totalRevenue: 75000,
        attribution: {
          'organic_search': { conversions: 375, revenue: 22500, percentage: 30 },
          'paid_search': { conversions: 312, revenue: 18750, percentage: 25 },
          'email': { conversions: 250, revenue: 15000, percentage: 20 },
          'social': { conversions: 187, revenue: 11250, percentage: 15 },
          'direct': { conversions: 125, revenue: 7500, percentage: 10 }
        }
      };

      return res.status(200).json(campaignAttribution);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Campaign attribution API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


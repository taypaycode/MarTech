/**
 * Vercel serverless function for specific journey by ID
 */

const journeyDetails = {
  'journey1': {
    id: 'journey1',
    name: 'E-commerce Purchase Journey',
    description: 'Customer journey for online purchases',
    stages: ['awareness', 'consideration', 'decision', 'purchase', 'retention'],
    touchpoints: [
      { id: 'tp1', name: 'Social Media Ad', stage: 'awareness', channel: 'social' },
      { id: 'tp2', name: 'Website Visit', stage: 'consideration', channel: 'organic_search' },
      { id: 'tp3', name: 'Product Review', stage: 'decision', channel: 'website' },
      { id: 'tp4', name: 'Add to Cart', stage: 'decision', channel: 'website' },
      { id: 'tp5', name: 'Purchase', stage: 'purchase', channel: 'website' },
      { id: 'tp6', name: 'Follow-up Email', stage: 'retention', channel: 'email' }
    ],
    conversionMetrics: {
      totalCustomers: 10000,
      convertedCustomers: 2500,
      conversionRate: 25,
      averageRevenue: 120,
      totalRevenue: 300000
    },
    created: '2023-01-15T00:00:00Z',
    updated: '2023-05-20T00:00:00Z'
  },
  'journey2': {
    id: 'journey2',
    name: 'Lead Generation Journey',
    description: 'B2B lead generation and nurturing path',
    stages: ['discovery', 'engagement', 'qualification', 'negotiation', 'conversion'],
    touchpoints: [
      { id: 'tp1', name: 'LinkedIn Ad', stage: 'discovery', channel: 'social' },
      { id: 'tp2', name: 'Whitepaper Download', stage: 'engagement', channel: 'website' },
      { id: 'tp3', name: 'Webinar Registration', stage: 'qualification', channel: 'email' },
      { id: 'tp4', name: 'Sales Call', stage: 'negotiation', channel: 'direct' },
      { id: 'tp5', name: 'Contract Signing', stage: 'conversion', channel: 'direct' }
    ],
    conversionMetrics: {
      totalLeads: 5000,
      qualifiedLeads: 1200,
      opportunities: 500,
      closedDeals: 150,
      conversionRate: 3,
      averageDealSize: 15000,
      totalRevenue: 2250000
    },
    created: '2023-02-10T00:00:00Z',
    updated: '2023-06-05T00:00:00Z'
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
  const { journeyId } = query;

  try {
    if (method === 'GET') {
      const journey = journeyDetails[journeyId];
      if (!journey) {
        return res.status(404).json({ error: 'Journey not found' });
      }
      return res.status(200).json(journey);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Journey API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


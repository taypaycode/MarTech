/**
 * Vercel serverless function for segmentation endpoints
 */

// Mock segments data
const segments = [
  {
    id: 'segment1',
    name: 'High-Value Customers',
    description: 'Customers with high lifetime value',
    criteria: {
      lifetime_value: { operator: '>=', value: 1000 },
      purchase_frequency: { operator: '>=', value: 5 }
    },
    size: 2500,
    created: '2023-01-10T00:00:00Z',
    updated: '2023-06-15T00:00:00Z'
  },
  {
    id: 'segment2',
    name: 'Cart Abandoners',
    description: 'Customers who abandoned their shopping cart',
    criteria: {
      abandoned_cart: { operator: '=', value: true },
      last_activity: { operator: '>=', value: '30d' }
    },
    size: 5000,
    created: '2023-02-20T00:00:00Z',
    updated: '2023-05-10T00:00:00Z'
  },
  {
    id: 'segment3',
    name: 'Email Subscribers',
    description: 'Customers who subscribed to the newsletter',
    criteria: {
      email_subscription: { operator: '=', value: true },
      email_engagement: { operator: '>=', value: 'medium' }
    },
    size: 10000,
    created: '2023-03-15T00:00:00Z',
    updated: '2023-04-22T00:00:00Z'
  }
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
        if (query.action === 'ai') {
          // AI-powered segmentation
          const aiSegments = [
            {
              id: 'ai_segment1',
              name: 'High-Intent Browsers',
              description: 'Users showing strong purchase intent based on browsing patterns',
              features: ['product_page_views', 'search_behavior', 'time_on_site'],
              importance: {
                product_page_views: 0.45,
                search_behavior: 0.35,
                time_on_site: 0.20
              },
              size: 1200,
              expectedConversionRate: 28,
              created: new Date().toISOString()
            },
            {
              id: 'ai_segment2',
              name: 'Seasonal Shoppers',
              description: 'Customers who primarily shop during specific seasons or promotions',
              features: ['purchase_seasonality', 'promotion_response', 'purchase_frequency'],
              importance: {
                purchase_seasonality: 0.50,
                promotion_response: 0.35,
                purchase_frequency: 0.15
              },
              size: 3500,
              expectedConversionRate: 15,
              created: new Date().toISOString()
            },
            {
              id: 'ai_segment3',
              name: 'Brand Loyalists',
              description: 'Customers who consistently choose specific brands',
              features: ['brand_affinity', 'purchase_history', 'browsing_patterns'],
              importance: {
                brand_affinity: 0.60,
                purchase_history: 0.25,
                browsing_patterns: 0.15
              },
              size: 900,
              expectedConversionRate: 45,
              created: new Date().toISOString()
            }
          ];
          return res.status(200).json(aiSegments);
        } else {
          // Get all segments
          return res.status(200).json(segments);
        }

      case 'POST':
        // Create new segment
        const newSegment = {
          id: `segment${Date.now()}`,
          ...req.body,
          size: Math.floor(Math.random() * 10000) + 500,
          created: new Date().toISOString(),
          updated: new Date().toISOString()
        };
        return res.status(201).json(newSegment);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Segmentation API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


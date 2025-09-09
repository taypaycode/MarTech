/**
 * Vercel serverless function for customer touchpoints
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
  const { customerId } = query;
  const { startDate, endDate } = query;

  try {
    if (method === 'GET') {
      // Mock touchpoints data
      const touchpointsData = {
        customerId,
        touchpoints: [
          {
            id: 'tp1',
            timestamp: '2023-07-01T10:15:00Z',
            type: 'page_view',
            channel: 'organic_search',
            campaign: null,
            details: { page: 'home', referrer: 'google.com', device: 'mobile' }
          },
          {
            id: 'tp2',
            timestamp: '2023-07-01T10:18:30Z',
            type: 'page_view',
            channel: 'website',
            campaign: null,
            details: { page: 'products', referrer: 'internal', device: 'mobile' }
          },
          {
            id: 'tp3',
            timestamp: '2023-07-02T15:42:00Z',
            type: 'email_open',
            channel: 'email',
            campaign: 'campaign1',
            details: { email_id: 'welcome_series_1', subject: 'Welcome to our store!' }
          },
          {
            id: 'tp4',
            timestamp: '2023-07-03T09:27:15Z',
            type: 'ad_click',
            channel: 'social',
            campaign: 'campaign2',
            details: { platform: 'facebook', ad_id: 'retargeting_001' }
          },
          {
            id: 'tp5',
            timestamp: '2023-07-05T14:20:45Z',
            type: 'purchase',
            channel: 'website',
            campaign: 'campaign1',
            details: { order_id: 'ORD12345', amount: 89.99, products: ['product1', 'product2'] }
          }
        ]
      };

      return res.status(200).json(touchpointsData);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Customer touchpoints API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


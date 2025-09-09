/**
 * Vercel serverless function for specific segment by ID
 */

const segmentDetails = {
  'segment1': {
    id: 'segment1',
    name: 'High-Value Customers',
    description: 'Customers with high lifetime value',
    criteria: {
      lifetime_value: { operator: '>=', value: 1000 },
      purchase_frequency: { operator: '>=', value: 5 }
    },
    size: 2500,
    customers: [
      { id: 'customer1', value: 1500, frequency: 8 },
      { id: 'customer2', value: 2200, frequency: 12 },
      { id: 'customer3', value: 1800, frequency: 9 }
    ],
    metrics: {
      averageValue: 1850,
      totalValue: 4625000,
      conversionRate: 35,
      retentionRate: 85
    },
    created: '2023-01-10T00:00:00Z',
    updated: '2023-06-15T00:00:00Z'
  },
  'segment2': {
    id: 'segment2',
    name: 'Cart Abandoners',
    description: 'Customers who abandoned their shopping cart',
    criteria: {
      abandoned_cart: { operator: '=', value: true },
      last_activity: { operator: '>=', value: '30d' }
    },
    size: 5000,
    customers: [
      { id: 'customer4', cart_value: 120, last_activity: '2023-06-28T10:15:00Z' },
      { id: 'customer5', cart_value: 85, last_activity: '2023-07-01T14:30:00Z' },
      { id: 'customer6', cart_value: 210, last_activity: '2023-06-25T09:45:00Z' }
    ],
    metrics: {
      averageCartValue: 95,
      totalPotentialValue: 475000,
      recoveryRate: 12,
      recoveredRevenue: 57000
    },
    created: '2023-02-20T00:00:00Z',
    updated: '2023-05-10T00:00:00Z'
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
  const { segmentId } = query;

  try {
    switch (method) {
      case 'GET':
        const segment = segmentDetails[segmentId];
        if (!segment) {
          return res.status(404).json({ error: 'Segment not found' });
        }
        return res.status(200).json(segment);

      case 'PUT':
        // Update segment
        const existingSegment = segmentDetails[segmentId];
        if (!existingSegment) {
          return res.status(404).json({ error: 'Segment not found' });
        }
        const updatedSegment = {
          ...existingSegment,
          ...req.body,
          updated: new Date().toISOString()
        };
        return res.status(200).json(updatedSegment);

      case 'DELETE':
        // Delete segment
        const segmentToDelete = segmentDetails[segmentId];
        if (!segmentToDelete) {
          return res.status(404).json({ error: 'Segment not found' });
        }
        return res.status(200).json({ message: 'Segment deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Segment API error:', error);
    return res.status(500).json({ error: error.message });
  }
}


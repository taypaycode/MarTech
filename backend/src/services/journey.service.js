const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

/**
 * Get all journey maps
 */
exports.getJourneyMaps = async () => {
  try {
    // In a real implementation, this would query a database or BigQuery
    // For demonstration, we'll return mock data
    return [
      {
        id: 'journey1',
        name: 'E-commerce Purchase Journey',
        description: 'Customer journey for online purchases',
        stages: ['awareness', 'consideration', 'decision', 'purchase', 'retention'],
        created: '2023-01-15T00:00:00Z',
        updated: '2023-05-20T00:00:00Z'
      },
      {
        id: 'journey2',
        name: 'Lead Generation Journey',
        description: 'B2B lead generation and nurturing path',
        stages: ['discovery', 'engagement', 'qualification', 'negotiation', 'conversion'],
        created: '2023-02-10T00:00:00Z',
        updated: '2023-06-05T00:00:00Z'
      },
      {
        id: 'journey3',
        name: 'Content Marketing Journey',
        description: 'Content-driven customer acquisition',
        stages: ['awareness', 'engagement', 'subscription', 'conversion', 'advocacy'],
        created: '2023-03-22T00:00:00Z',
        updated: '2023-04-18T00:00:00Z'
      }
    ];
  } catch (error) {
    console.error('Error getting journey maps:', error);
    throw error;
  }
};

/**
 * Get journey by ID
 */
exports.getJourneyById = async (journeyId) => {
  try {
    // In a real implementation, this would query a database or BigQuery
    // For demonstration, we'll return mock data
    const journeys = {
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
    
    return journeys[journeyId] || null;
  } catch (error) {
    console.error(`Error getting journey ${journeyId}:`, error);
    throw error;
  }
};

/**
 * Get customer touchpoints
 */
exports.getCustomerTouchpoints = async (customerId, startDate, endDate) => {
  try {
    // Sample query to get customer touchpoints from BigQuery
    const query = `
      SELECT
        event_timestamp,
        touchpoint_type,
        channel,
        campaign_id,
        interaction_details
      FROM
        \`your_project.your_dataset.customer_touchpoints\`
      WHERE
        customer_id = '${customerId}'
        ${startDate ? `AND event_timestamp >= '${startDate}'` : ''}
        ${endDate ? `AND event_timestamp <= '${endDate}'` : ''}
      ORDER BY
        event_timestamp ASC
    `;
    
    // This is a mock response for demonstration purposes
    // In a real implementation, you would run the query against BigQuery
    return {
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
  } catch (error) {
    console.error(`Error getting touchpoints for customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Create a new journey map
 */
exports.createJourneyMap = async (journeyMapData) => {
  try {
    // In a real implementation, this would save to a database
    // For demonstration, we'll just return the data with an ID
    const newJourneyMap = {
      id: `journey${Date.now()}`,
      ...journeyMapData,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
    
    return newJourneyMap;
  } catch (error) {
    console.error('Error creating journey map:', error);
    throw error;
  }
}; 
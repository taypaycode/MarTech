import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Sankey, 
  Tooltip, 
  ResponsiveContainer,
  Rectangle
} from 'recharts';

// Mock data for the customer journey
const mockJourneyData = {
  nodes: [
    { name: 'Website Visit' },
    { name: 'Product Page' },
    { name: 'Add to Cart' },
    { name: 'Checkout' },
    { name: 'Purchase' },
    { name: 'Social Ad' },
    { name: 'Search Ad' },
    { name: 'Email Campaign' },
    { name: 'Abandoned Cart' },
    { name: 'Retargeting Ad' },
  ],
  links: [
    { source: 5, target: 0, value: 2500 },
    { source: 6, target: 0, value: 5000 },
    { source: 7, target: 0, value: 3000 },
    { source: 0, target: 1, value: 8000 },
    { source: 1, target: 2, value: 4000 },
    { source: 2, target: 3, value: 2000 },
    { source: 3, target: 4, value: 1500 },
    { source: 2, target: 8, value: 2000 },
    { source: 8, target: 9, value: 1500 },
    { source: 9, target: 1, value: 1000 },
  ]
};

// Customer segments for filtering
const customerSegments = [
  { id: 'all', name: 'All Customers' },
  { id: 'new', name: 'New Customers' },
  { id: 'returning', name: 'Returning Customers' },
  { id: 'high_value', name: 'High-Value Customers' },
];

// Timeframes for filtering
const timeframes = [
  { id: '7d', name: 'Last 7 Days' },
  { id: '30d', name: 'Last 30 Days' },
  { id: '90d', name: 'Last 90 Days' },
  { id: 'ytd', name: 'Year to Date' },
];

const CustomerJourney = () => {
  const [loading, setLoading] = useState(true);
  const [journeyData, setJourneyData] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with a delay
        setTimeout(() => {
          setJourneyData(mockJourneyData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSegment, selectedTimeframe]);

  const handleSegmentChange = (event) => {
    setSelectedSegment(event.target.value);
  };

  const handleTimeframeChange = (event) => {
    setSelectedTimeframe(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography color="error" variant="h6">
          Error loading customer journey data: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Journey Mapping
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="segment-select-label">Customer Segment</InputLabel>
              <Select
                labelId="segment-select-label"
                id="segment-select"
                value={selectedSegment}
                label="Customer Segment"
                onChange={handleSegmentChange}
              >
                {customerSegments.map((segment) => (
                  <MenuItem key={segment.id} value={segment.id}>{segment.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="timeframe-select-label">Timeframe</InputLabel>
              <Select
                labelId="timeframe-select-label"
                id="timeframe-select"
                value={selectedTimeframe}
                label="Timeframe"
                onChange={handleTimeframeChange}
              >
                {timeframes.map((timeframe) => (
                  <MenuItem key={timeframe.id} value={timeframe.id}>{timeframe.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Card>
        <CardHeader title="Customer Journey Flow" />
        <CardContent>
          <Box sx={{ height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={journeyData}
                node={<Rectangle fill="#8884d8" />}
                nodePadding={50}
                margin={{
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: 20,
                }}
                link={{ stroke: '#d0d0d0' }}
              >
                <Tooltip />
              </Sankey>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Top Entry Points" />
            <CardContent>
              <Typography variant="body1">
                1. Search Ads - 5,000 visitors
              </Typography>
              <Typography variant="body1">
                2. Email Campaigns - 3,000 visitors
              </Typography>
              <Typography variant="body1">
                3. Social Ads - 2,500 visitors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Conversion Bottlenecks" />
            <CardContent>
              <Typography variant="body1">
                1. Add to Cart → Checkout (50% drop-off)
              </Typography>
              <Typography variant="body1">
                2. Checkout → Purchase (25% drop-off)
              </Typography>
              <Typography variant="body1">
                3. Website Visit → Product Page (20% drop-off)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerJourney; 
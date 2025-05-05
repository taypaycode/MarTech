import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Paper, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { getAttributionReport } from '../services/attributionService';
import { getROIForecasts } from '../services/roiService';
import { getAllSegments } from '../services/segmentationService';

// Mock data (in a real app, this would come from the API)
const channelPerformance = [
  { name: 'Social Media', impressions: 150000, clicks: 15000, conversions: 750 },
  { name: 'Search', impressions: 200000, clicks: 20000, conversions: 1000 },
  { name: 'Email', impressions: 50000, clicks: 5000, conversions: 1000 },
  { name: 'Display', impressions: 300000, clicks: 9000, conversions: 450 },
  { name: 'Referral', impressions: 30000, clicks: 6000, conversions: 300 },
];

const conversionTrend = [
  { month: 'Jan', conversions: 500, revenue: 25000 },
  { month: 'Feb', conversions: 600, revenue: 30000 },
  { month: 'Mar', conversions: 750, revenue: 37500 },
  { month: 'Apr', conversions: 800, revenue: 40000 },
  { month: 'May', conversions: 950, revenue: 47500 },
  { month: 'Jun', conversions: 1200, revenue: 60000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [attributionData, setAttributionData] = useState(null);
  const [roiData, setRoiData] = useState(null);
  const [segmentData, setSegmentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be actual API calls
        // For now, we'll simulate API calls with timeouts and mock data
        
        setTimeout(() => {
          setAttributionData({
            channels: {
              'social': { revenue: 90000, percentage: 30 },
              'search': { revenue: 75000, percentage: 25 },
              'email': { revenue: 60000, percentage: 20 },
              'display': { revenue: 45000, percentage: 15 },
              'referral': { revenue: 30000, percentage: 10 }
            }
          });
        }, 500);
        
        setTimeout(() => {
          setRoiData([
            {
              id: 'forecast1',
              name: 'Q3 2023 Marketing ROI Forecast',
              totalSpend: 250000,
              predictedRevenue: 1250000,
              predictedROI: 5.0
            }
          ]);
        }, 700);
        
        setTimeout(() => {
          setSegmentData([
            {
              id: 'segment1',
              name: 'High-Value Customers',
              size: 2500
            },
            {
              id: 'segment2',
              name: 'Cart Abandoners',
              size: 5000
            },
            {
              id: 'segment3',
              name: 'Email Subscribers',
              size: 10000
            }
          ]);
        }, 900);
        
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for the attribution pie chart
  const prepareAttributionData = () => {
    if (!attributionData || !attributionData.channels) return [];
    
    return Object.entries(attributionData.channels).map(([channel, data]) => ({
      name: channel.charAt(0).toUpperCase() + channel.slice(1),
      value: data.percentage
    }));
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
          Error loading dashboard: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* KPI Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Total Conversions
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              4,500
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +15% from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e8f5e9',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Revenue
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              $240K
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +12% from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fff8e1',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Marketing ROI
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              5.2x
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +0.3 from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fce4ec',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Active Customers
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              17.5K
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +8% from last month
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Channel Performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Channel Performance" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={channelPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impressions" name="Impressions" fill="#8884d8" />
                  <Bar dataKey="clicks" name="Clicks" fill="#82ca9d" />
                  <Bar dataKey="conversions" name="Conversions" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Conversion Trend */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Conversion Trend" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={conversionTrend}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="conversions"
                    name="Conversions"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue ($)"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Attribution Model */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Attribution Model" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareAttributionData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareAttributionData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Audience Segments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Audience Segments" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="size"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {segmentData && segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
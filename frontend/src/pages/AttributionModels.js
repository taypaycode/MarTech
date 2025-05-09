import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { getAttributionModels, getAttributionReport } from '../services/attributionService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AttributionModels = () => {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be actual API calls
        // For now, we'll simulate API calls with timeouts and mock data
        
        setTimeout(() => {
          setModels([
            { id: 'first_touch', name: 'First Touch Attribution', description: 'Credits the first touchpoint' },
            { id: 'last_touch', name: 'Last Touch Attribution', description: 'Credits the last touchpoint' },
            { id: 'linear', name: 'Linear Attribution', description: 'Distributes credit equally' },
            { id: 'time_decay', name: 'Time Decay Attribution', description: 'More recent touchpoints get more credit' },
            { id: 'position_based', name: 'Position Based Attribution', description: '40/20/40 credit for first, middle, and last' },
            { id: 'markov_chain', name: 'Markov Chain Attribution', description: 'Data-driven attribution model' }
          ]);
        }, 500);
        
        setTimeout(() => {
          setReport({
            timeframe: {
              startDate: '2023-01-01',
              endDate: '2023-06-30'
            },
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
          });
        }, 700);
        
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
          Error loading attribution data: {error}
        </Typography>
      </Box>
    );
  }

  // Prepare data for the attribution pie chart
  const prepareAttributionData = () => {
    if (!report || !report.channels) return [];
    
    return Object.entries(report.channels).map(([channel, data]) => ({
      name: channel.replace('_', ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      value: data.percentage
    }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Attribution Models
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="attribution model tabs">
          <Tab label="Overview" />
          <Tab label="Models" />
          <Tab label="Campaigns" />
        </Tabs>
      </Paper>

      {activeTab === 0 && report && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Channel Attribution" />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={prepareAttributionData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {prepareAttributionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Attribution Summary" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Channel</TableCell>
                        <TableCell align="right">Conversions</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {report && report.channels && Object.entries(report.channels).map(([channel, data]) => (
                        <TableRow key={channel}>
                          <TableCell component="th" scope="row">
                            {channel.replace('_', ' ').split(' ')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </TableCell>
                          <TableCell align="right">{data.conversions.toLocaleString()}</TableCell>
                          <TableCell align="right">${data.revenue.toLocaleString()}</TableCell>
                          <TableCell align="right">{data.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Card>
          <CardHeader title="Available Attribution Models" />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {models.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell component="th" scope="row">
                        {model.name}
                      </TableCell>
                      <TableCell>{model.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && report && report.campaigns && (
        <Card>
          <CardHeader title="Campaign Performance" />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Campaign</TableCell>
                    <TableCell align="right">Conversions</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell component="th" scope="row">
                        {campaign.name}
                      </TableCell>
                      <TableCell align="right">{campaign.conversions.toLocaleString()}</TableCell>
                      <TableCell align="right">${campaign.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AttributionModels; 
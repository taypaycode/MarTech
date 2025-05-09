import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { getAllSegments } from '../services/segmentationService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AudienceSegmentation = () => {
  const [loading, setLoading] = useState(true);
  const [segments, setSegments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, we would call the API
        // For now, simulating with a timeout and mock data
        setTimeout(() => {
          setSegments([
            {
              id: 'segment1',
              name: 'High-Value Customers',
              description: 'Customers with lifetime value > $1000',
              size: 2500,
              criteria: {
                ltv: { min: 1000 },
                purchases: { min: 3 }
              },
              created: '2023-06-15T10:30:00Z',
              updated: '2023-06-15T10:30:00Z'
            },
            {
              id: 'segment2',
              name: 'Cart Abandoners',
              description: 'Customers who abandoned cart in last 30 days',
              size: 5000,
              criteria: {
                abandoned_cart: { days: 30 }
              },
              created: '2023-06-10T14:20:00Z',
              updated: '2023-06-14T11:15:00Z'
            },
            {
              id: 'segment3',
              name: 'Email Subscribers',
              description: 'All email subscribers',
              size: 10000,
              criteria: {
                email_subscription: true
              },
              created: '2023-05-05T09:10:00Z',
              updated: '2023-05-05T09:10:00Z'
            },
            {
              id: 'segment4',
              name: 'New Customers',
              description: 'Customers who made their first purchase in last 90 days',
              size: 3500,
              criteria: {
                first_purchase: { days: 90 }
              },
              created: '2023-06-01T16:45:00Z',
              updated: '2023-06-01T16:45:00Z'
            },
            {
              id: 'segment5',
              name: 'Inactive Customers',
              description: 'No purchase in last 180 days',
              size: 7500,
              criteria: {
                last_purchase: { min_days: 180 }
              },
              created: '2023-05-20T13:30:00Z',
              updated: '2023-05-20T13:30:00Z'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the segments pie chart
  const prepareSegmentData = () => {
    if (!segments || segments.length === 0) return [];
    
    return segments.map((segment) => ({
      name: segment.name,
      value: segment.size
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
          Error loading audience segments: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Audience Segmentation
        </Typography>
        <Button variant="contained" color="primary">
          Create New Segment
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardHeader title="Segment Distribution" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={prepareSegmentData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {prepareSegmentData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value.toLocaleString()} users`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            <CardHeader title="Total Audience Size" />
            <CardContent>
              <Typography variant="h2" align="center">
                {segments.reduce((sum, segment) => sum + segment.size, 0).toLocaleString()}
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary">
                Users in all segments
              </Typography>
            </CardContent>
          </Card>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Largest Segment</Typography>
                  <Typography variant="h4">
                    {segments.length > 0 ? segments.reduce((max, segment) => segment.size > max.size ? segment : max, segments[0]).name : ''}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Newest Segment</Typography>
                  <Typography variant="h4">
                    {segments.length > 0 ? segments.reduce((newest, segment) => new Date(segment.created) > new Date(newest.created) ? segment : newest, segments[0]).name : ''}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="All Segments" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Size</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Last Updated</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {segments.map((segment) => (
                      <TableRow key={segment.id}>
                        <TableCell component="th" scope="row">
                          {segment.name}
                        </TableCell>
                        <TableCell>{segment.description}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={`${segment.size.toLocaleString()} users`} 
                            color="primary" 
                            variant="outlined" 
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(segment.created).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(segment.updated).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AudienceSegmentation; 
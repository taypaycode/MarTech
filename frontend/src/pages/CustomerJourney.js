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
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress
} from '@mui/material';
import { 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  // LineChart,
  // Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  // FunnelChart,
  // Funnel,
  // LabelList
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

// Mock data for customer journey stages
const journeyStagesData = [
  { stage: 'Awareness', visitors: 10000, conversions: 8500, rate: 85 },
  { stage: 'Interest', visitors: 8500, conversions: 6000, rate: 71 },
  { stage: 'Consideration', visitors: 6000, conversions: 3500, rate: 58 },
  { stage: 'Purchase Intent', visitors: 3500, conversions: 2000, rate: 57 },
  { stage: 'Purchase', visitors: 2000, conversions: 1200, rate: 60 },
  { stage: 'Retention', visitors: 1200, conversions: 800, rate: 67 }
];

// Funnel data for conversion visualization
const funnelData = [
  { name: 'Website Visitors', value: 10000, fill: '#0088FE' },
  { name: 'Product Views', value: 8500, fill: '#00C49F' },
  { name: 'Add to Cart', value: 6000, fill: '#FFBB28' },
  { name: 'Checkout Started', value: 3500, fill: '#FF8042' },
  { name: 'Payment Info', value: 2000, fill: '#8884D8' },
  { name: 'Purchase Complete', value: 1200, fill: '#82ca9d' }
];

// Channel attribution data
const channelData = [
  { channel: 'Organic Search', visitors: 3500, conversions: 420, revenue: 25200 },
  { channel: 'Paid Search', visitors: 2800, conversions: 390, revenue: 23400 },
  { channel: 'Social Media', visitors: 2200, conversions: 220, revenue: 13200 },
  { channel: 'Email', visitors: 1000, conversions: 120, revenue: 7200 },
  { channel: 'Direct', visitors: 500, conversions: 50, revenue: 3000 }
];

// Time-based journey data
const timeBasedData = [
  { day: 'Mon', awareness: 1200, interest: 900, consideration: 600, purchase: 180 },
  { day: 'Tue', awareness: 1400, interest: 1100, consideration: 750, purchase: 210 },
  { day: 'Wed', awareness: 1600, interest: 1300, consideration: 900, purchase: 250 },
  { day: 'Thu', awareness: 1800, interest: 1500, consideration: 1100, purchase: 300 },
  { day: 'Fri', awareness: 2000, interest: 1700, consideration: 1300, purchase: 350 },
  { day: 'Sat', awareness: 1500, interest: 1200, consideration: 800, purchase: 220 },
  { day: 'Sun', awareness: 1000, interest: 800, consideration: 500, purchase: 140 }
];

// Touchpoint effectiveness data
const touchpointData = [
  { touchpoint: 'First Visit', impact: 85, frequency: 10000 },
  { touchpoint: 'Email Open', impact: 65, frequency: 4500 },
  { touchpoint: 'Social Engagement', impact: 45, frequency: 2800 },
  { touchpoint: 'Retargeting Ad', impact: 75, frequency: 3200 },
  { touchpoint: 'Product Review', impact: 90, frequency: 1500 },
  { touchpoint: 'Support Chat', impact: 95, frequency: 800 }
];

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
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Debug: Log the data to console
        console.log('Funnel Data:', funnelData);
        console.log('Touchpoint Data:', touchpointData);
        
        // Simulate API call with a delay
        setTimeout(() => {
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

      {/* Filters */}
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

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, bgcolor: '#e3f2fd' }}>
            <Typography variant="h6" color="textSecondary">Total Visitors</Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>10,000</Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>+8% from last period</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, bgcolor: '#e8f5e9' }}>
            <Typography variant="h6" color="textSecondary">Conversions</Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>1,200</Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>+12% from last period</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, bgcolor: '#fff8e1' }}>
            <Typography variant="h6" color="textSecondary">Conversion Rate</Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>12%</Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>+0.8% from last period</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, bgcolor: '#fce4ec' }}>
            <Typography variant="h6" color="textSecondary">Avg. Time to Convert</Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>5.2d</Typography>
            <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>+0.3d from last period</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Conversion Funnel */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Conversion Funnel" />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={funnelData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Visitors']} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Channel Attribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Channel Attribution" />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="conversions"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        
                        // Only show percentages > 3% to avoid clutter
                        if (percent < 0.03) return null;
                        
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Conversions']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Journey Stages Performance */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Journey Stages Performance" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Stage</TableCell>
                      <TableCell align="right">Visitors</TableCell>
                      <TableCell align="right">Conversions</TableCell>
                      <TableCell align="right">Conversion Rate</TableCell>
                      <TableCell align="center">Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {journeyStagesData.map((stage) => (
                      <TableRow key={stage.stage}>
                        <TableCell component="th" scope="row">
                          <Typography variant="subtitle2">{stage.stage}</Typography>
                        </TableCell>
                        <TableCell align="right">{stage.visitors.toLocaleString()}</TableCell>
                        <TableCell align="right">{stage.conversions.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={`${stage.rate}%`} 
                            color={stage.rate > 70 ? 'success' : stage.rate > 50 ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ width: 200 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={stage.rate} 
                                color={stage.rate > 70 ? 'success' : stage.rate > 50 ? 'warning' : 'error'}
                              />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                              <Typography variant="body2" color="text.secondary">
                                {stage.rate}%
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Journey Trends */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Weekly Journey Trends" />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeBasedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="awareness" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="interest" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="consideration" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    <Area type="monotone" dataKey="purchase" stackId="1" stroke="#ff7300" fill="#ff7300" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Touchpoint Effectiveness */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Touchpoint Effectiveness" />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={touchpointData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="touchpoint" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      fontSize={11}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Impact Score']} />
                    <Bar dataKey="impact" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Channel Performance Details */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Channel Performance Details" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Channel</TableCell>
                      <TableCell align="right">Visitors</TableCell>
                      <TableCell align="right">Conversions</TableCell>
                      <TableCell align="right">Conversion Rate</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Revenue per Visitor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {channelData.map((channel) => (
                      <TableRow key={channel.channel}>
                        <TableCell component="th" scope="row">
                          <Typography variant="subtitle2">{channel.channel}</Typography>
                        </TableCell>
                        <TableCell align="right">{channel.visitors.toLocaleString()}</TableCell>
                        <TableCell align="right">{channel.conversions.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          {((channel.conversions / channel.visitors) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell align="right">${channel.revenue.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          ${(channel.revenue / channel.visitors).toFixed(2)}
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

export default CustomerJourney;
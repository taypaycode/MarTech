import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Slider,
  Stack
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { getROIForecasts } from '../services/roiService';

// Mock data for the ROI forecast
const mockForecastData = [
  { month: 'Jan', spend: 50000, revenue: 200000, roi: 4.0 },
  { month: 'Feb', spend: 55000, revenue: 220000, roi: 4.0 },
  { month: 'Mar', spend: 60000, revenue: 270000, roi: 4.5 },
  { month: 'Apr', spend: 65000, revenue: 325000, roi: 5.0 },
  { month: 'May', spend: 70000, revenue: 350000, roi: 5.0 },
  { month: 'Jun', spend: 75000, revenue: 400000, roi: 5.3 }
];

// Mock data for channel forecasts
const mockChannelForecasts = [
  { name: 'Social Media', spend: 25000, revenue: 125000, roi: 5.0 },
  { name: 'Search', spend: 30000, revenue: 180000, roi: 6.0 },
  { name: 'Email', spend: 10000, revenue: 70000, roi: 7.0 },
  { name: 'Display', spend: 20000, revenue: 80000, roi: 4.0 },
  { name: 'Referral', spend: 5000, revenue: 30000, roi: 6.0 }
];

const ROIForecast = () => {
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState(null);
  const [channelForecasts, setChannelForecasts] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [budgetMultiplier, setBudgetMultiplier] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with a delay
        setTimeout(() => {
          // Apply the budget multiplier to the mock data
          const adjustedForecastData = mockForecastData.map(item => ({
            ...item,
            spend: item.spend * budgetMultiplier,
            revenue: item.revenue * (budgetMultiplier * 0.9 + 0.1) // Diminishing returns
          }));
          
          // Recalculate ROI based on adjusted spend and revenue
          adjustedForecastData.forEach(item => {
            item.roi = item.revenue / item.spend;
          });
          
          setForecastData(adjustedForecastData);
          
          // Adjust channel forecasts similarly
          const adjustedChannelForecasts = mockChannelForecasts.map(item => ({
            ...item,
            spend: item.spend * budgetMultiplier,
            revenue: item.revenue * (budgetMultiplier * 0.9 + 0.1)
          }));
          
          // Recalculate ROI for channels
          adjustedChannelForecasts.forEach(item => {
            item.roi = item.revenue / item.spend;
          });
          
          setChannelForecasts(adjustedChannelForecasts);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [budgetMultiplier, selectedTimeframe]);

  const handleTimeframeChange = (event) => {
    setSelectedTimeframe(event.target.value);
  };

  const handleBudgetChange = (event, newValue) => {
    setBudgetMultiplier(newValue);
  };

  const calculateTotals = () => {
    if (!forecastData) return { totalSpend: 0, totalRevenue: 0, averageROI: 0 };
    
    const totalSpend = forecastData.reduce((sum, item) => sum + item.spend, 0);
    const totalRevenue = forecastData.reduce((sum, item) => sum + item.revenue, 0);
    const averageROI = totalRevenue / totalSpend;
    
    return { totalSpend, totalRevenue, averageROI };
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
          Error loading ROI forecast data: {error}
        </Typography>
      </Box>
    );
  }

  const { totalSpend, totalRevenue, averageROI } = calculateTotals();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ROI Forecast
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="timeframe-select-label">Forecast Timeframe</InputLabel>
              <Select
                labelId="timeframe-select-label"
                id="timeframe-select"
                value={selectedTimeframe}
                label="Forecast Timeframe"
                onChange={handleTimeframeChange}
              >
                <MenuItem value="3m">3 Months</MenuItem>
                <MenuItem value="6m">6 Months</MenuItem>
                <MenuItem value="12m">12 Months</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography gutterBottom>Marketing Budget Multiplier</Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={budgetMultiplier}
                min={0.5}
                max={2}
                step={0.1}
                marks={[
                  { value: 0.5, label: '50%' },
                  { value: 1, label: '100%' },
                  { value: 1.5, label: '150%' },
                  { value: 2, label: '200%' },
                ]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                onChange={handleBudgetChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
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
              Total Marketing Spend
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              ${totalSpend.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Projected for {selectedTimeframe}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
              Predicted Revenue
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              ${totalRevenue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              +{((averageROI - 1) * 100).toFixed(0)}% ROI
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
              Average ROI
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {averageROI.toFixed(1)}x
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Return on Investment
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Monthly Forecast" />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={forecastData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="spend" name="Marketing Spend" stroke="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Channel Performance Forecast" />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelForecasts}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => name === 'roi' ? `${value.toFixed(1)}x` : `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#8884d8" />
                    <Bar yAxisId="left" dataKey="spend" name="Marketing Spend" fill="#82ca9d" />
                    <Bar yAxisId="right" dataKey="roi" name="ROI" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ROIForecast; 
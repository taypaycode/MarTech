require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const attributionRoutes = require('./routes/attribution');
const journeyRoutes = require('./routes/journey');
const segmentationRoutes = require('./routes/segmentation');
const roiRoutes = require('./routes/roi');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/attribution', attributionRoutes);
app.use('/api/journey', journeyRoutes);
app.use('/api/segmentation', segmentationRoutes);
app.use('/api/roi', roiRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'MarTech Journey Analytics API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 
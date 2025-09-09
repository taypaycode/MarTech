# MarTech Journey - Vercel Deployment Guide

## Overview

This guide explains how to deploy the MarTech Journey Analytics Platform to Vercel with dummy data for demonstration purposes.

## Project Structure

```
martech-journey/
├── api/                          # Vercel serverless functions
│   ├── attribution/
│   ├── journey/
│   ├── roi/
│   ├── segmentation/
│   └── index.js
├── frontend/                     # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.production
├── package.json                  # Root package.json
├── vercel.json                   # Vercel configuration
└── README.md
```

## Deployment Steps

### 1. Prepare for Deployment

Ensure you have the Vercel CLI installed:
```bash
npm install -g vercel
```

### 2. Deploy to Vercel

From the project root directory:

```bash
# Login to Vercel (if not already logged in)
vercel login

# Deploy the project
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: martech-journey (or your preferred name)
# - Directory: ./ (current directory)
```

### 3. Environment Variables

The deployment includes these environment variables:
- `REACT_APP_API_URL=/api` - Points frontend to serverless functions

### 4. Verify Deployment

After deployment, test these endpoints:

- **API Health Check**: `https://your-app.vercel.app/api`
- **Journey Data**: `https://your-app.vercel.app/api/journey`
- **Attribution Models**: `https://your-app.vercel.app/api/attribution?action=models`
- **Segmentation**: `https://your-app.vercel.app/api/segmentation`
- **ROI Forecasts**: `https://your-app.vercel.app/api/roi`

### 5. Frontend Routes

The React application supports these routes:
- `/` - Dashboard
- `/attribution` - Attribution Models
- `/journey` - Customer Journey
- `/segmentation` - Audience Segmentation
- `/roi` - ROI Forecast

## API Endpoints

### Journey Mapping
- `GET /api/journey` - Get all journey maps
- `GET /api/journey/[journeyId]` - Get specific journey
- `GET /api/journey/customer/[customerId]` - Get customer touchpoints
- `POST /api/journey` - Create new journey map

### Attribution Analysis
- `GET /api/attribution?action=models` - Get attribution models
- `GET /api/attribution?action=report` - Get attribution report
- `GET /api/attribution/campaign/[campaignId]` - Get campaign attribution
- `POST /api/attribution?action=custom` - Apply custom attribution model

### Audience Segmentation
- `GET /api/segmentation` - Get all segments
- `GET /api/segmentation?action=ai` - Get AI-powered segments
- `GET /api/segmentation/[segmentId]` - Get specific segment
- `POST /api/segmentation` - Create new segment
- `PUT /api/segmentation/[segmentId]` - Update segment
- `DELETE /api/segmentation/[segmentId]` - Delete segment

### ROI Forecasting
- `GET /api/roi` - Get all ROI forecasts
- `GET /api/roi?action=predictive` - Run predictive analysis
- `GET /api/roi/[forecastId]` - Get specific forecast
- `GET /api/roi/campaign/[campaignId]` - Get campaign ROI forecast
- `POST /api/roi` - Create new ROI forecast

## Demo Data

All API endpoints return realistic mock data including:
- Customer journey touchpoints and conversion metrics
- Multi-touch attribution data across channels
- AI-powered audience segments with features and importance scores
- ROI forecasts with confidence intervals and channel breakdowns

## Troubleshooting

### 404 Errors
- Ensure `vercel.json` routes are configured correctly
- Check that API files are in the `api/` directory
- Verify frontend build is successful

### API Issues
- Check serverless function logs in Vercel dashboard
- Ensure CORS headers are properly set
- Verify environment variables are configured

### Frontend Issues
- Check that `REACT_APP_API_URL=/api` is set
- Ensure frontend build completes without errors
- Verify React Router routes are configured properly

## Development

For local development:

```bash
# Install dependencies
npm install
cd frontend && npm install

# Start development server
vercel dev
```

This will start both the frontend and API functions locally at `http://localhost:3000`.


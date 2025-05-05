# Getting Started

This guide will help you set up and run the MarTech Journey Analytics Platform.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Google Cloud Platform account (for BigQuery integration)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/martech-journey.git
   cd martech-journey
   ```

2. Set up Google Cloud credentials (optional, for BigQuery integration):
   - Create a service account with BigQuery permissions in GCP
   - Download the JSON key file
   - Save it as `credentials/google-credentials.json`

3. Start the application:
   - On Linux/Mac:
     ```
     chmod +x start.sh
     ./start.sh
     ```
   - On Windows:
     ```
     powershell -ExecutionPolicy Bypass -File start.ps1
     ```

4. Access the application:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - JupyterLab (Data Processing): http://localhost:8888

## Project Structure

- `/backend` - Node.js RESTful API
  - Express.js server
  - MongoDB connection
  - BigQuery integration
  
- `/frontend` - React-based dashboard
  - Material UI components
  - Data visualization with recharts
  - Responsive design
  
- `/data_processing` - Python data processing
  - Jupyter notebooks
  - Attribution models
  - Segmentation algorithms
  - Predictive analytics
  
- `/infrastructure` - Deployment configurations
  - Docker Compose setup
  - Kubernetes manifests (coming soon)
  
- `/docs` - Project documentation

## Development Workflow

1. Make changes to the code
2. The development environment has hot-reloading enabled
3. See changes automatically in the browser
4. For data processing, use the JupyterLab interface

## Core Features

- **Customer Journey Mapping**: Visualize the complete customer journey
- **Multi-Touch Attribution**: Apply different attribution models
- **Audience Segmentation**: Identify valuable customer segments
- **ROI Forecasting**: Predict potential ROI of marketing initiatives

## Next Steps

After setting up the platform, you should:

1. Connect your data sources
2. Create customer journey maps
3. Run attribution models on your data
4. Generate audience segments
5. Create ROI forecasts

For more detailed documentation, see the README.md files in each directory. 
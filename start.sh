#!/bin/bash

# MarTech Journey Analytics Platform Startup Script

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker and Docker Compose."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose."
    exit 1
fi

# Check if credentials file exists
if [ ! -f "./credentials/google-credentials.json" ]; then
    echo "Warning: Google credentials file not found!"
    echo "You won't be able to use BigQuery integration until you add a valid google-credentials.json file."
    echo "See credentials/README.md for instructions."
    echo ""
fi

echo "Starting MarTech Journey Analytics Platform..."

# Build and start the containers
docker-compose up --build

# Exit with the status from docker-compose
exit $? 
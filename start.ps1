# MarTech Journey Analytics Platform Startup Script (PowerShell)

# Check if Docker is installed
try {
    $dockerVersion = docker --version
} catch {
    Write-Error "Error: Docker is not installed. Please install Docker and Docker Compose."
    exit 1
}

# Check if Docker Compose is installed
try {
    $composeVersion = docker-compose --version
} catch {
    Write-Error "Error: Docker Compose is not installed. Please install Docker Compose."
    exit 1
}

# Check if credentials file exists
if (-Not (Test-Path -Path "./credentials/google-credentials.json")) {
    Write-Warning "Google credentials file not found!"
    Write-Host "You won't be able to use BigQuery integration until you add a valid google-credentials.json file."
    Write-Host "See credentials/README.md for instructions."
    Write-Host ""
}

Write-Host "Starting MarTech Journey Analytics Platform..."

# Build and start the containers
docker-compose up --build

# Exit with the status from docker-compose
exit $LASTEXITCODE 
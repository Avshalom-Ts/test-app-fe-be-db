# PowerShell script to start Docker Compose with hostname
# This script sets the HOSTNAME environment variable to the current machine's hostname
# and then starts the Docker Compose services

Write-Host "Setting up environment with hostname: $env:COMPUTERNAME" -ForegroundColor Green

# Set the HOSTNAME environment variable to the current computer name
$env:HOSTNAME = $env:COMPUTERNAME

# Start Docker Compose
Write-Host "Starting Docker Compose services..." -ForegroundColor Yellow
docker-compose up --build -d

Write-Host "Services started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:4200" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Nginx: http://localhost:80" -ForegroundColor Cyan
Write-Host "Docker Host Hostname: $env:HOSTNAME" -ForegroundColor Magenta

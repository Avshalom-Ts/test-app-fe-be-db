@echo off
REM Batch script to start Docker Compose with hostname
REM This script sets the HOSTNAME environment variable to the current machine's hostname
REM and then starts the Docker Compose services

echo Setting up environment with hostname: %COMPUTERNAME%

REM Set the HOSTNAME environment variable to the current computer name
set HOSTNAME=%COMPUTERNAME%

REM Start Docker Compose
echo Starting Docker Compose services...
docker-compose up --build -d

echo Services started!
echo Frontend: http://localhost:4200
echo Backend: http://localhost:3000
echo Nginx: http://localhost:80
echo Docker Host Hostname: %HOSTNAME%

pause

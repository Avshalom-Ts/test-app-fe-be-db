#!/bin/bash
# Bash script to start Docker Compose with hostname
# This script sets the HOSTNAME environment variable to the current machine's hostname
# and then starts the Docker Compose services

echo "Setting up environment with hostname: $(hostname)"

# Set the HOSTNAME environment variable to the current hostname
export HOSTNAME=$(hostname)

# Start Docker Compose
echo "Starting Docker Compose services..."
docker-compose up --build -d

echo "Services started!"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:3000"
echo "Nginx: http://localhost:80"
echo "Docker Host Hostname: $HOSTNAME"

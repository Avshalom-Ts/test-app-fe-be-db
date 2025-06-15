# Docker image for Angular frontend
ARG BUILD_NODE_IMAGE=node:alpine3.21
ARG PROD_NODE_IMAGE=nginx:stable-alpine3.21-slim

FROM ${BUILD_NODE_IMAGE} AS build
WORKDIR /app
COPY package*.json ./

RUN npm ci
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

RUN npm i @nrwl/cli

COPY . .

RUN npx nx run front-end:build --configuration=production

# Use a simple HTTP server like serve (or you could use a basic Node.js server)
FROM ${BUILD_NODE_IMAGE} AS production
# RUN npm install -g pm2
RUN npm install -g serve
WORKDIR /app

# Copy the compiled Angular project from the build stage
COPY --from=build /app/dist/apps/front-end/browser /app
# COPY --from=build /app/dist/apps/front-end/browser /usr/share/nginx/html

# Use the 'serve' command to serve the static files
# CMD ["pm2", "serve", "--spa","-i","3"]
CMD ["serve", "-s", ".", "-l", "4200"]
# CMD ["pm2-runtime", "start" ,"main.js", "--name", "back-end", "-i","3"]

EXPOSE 4200

# To build the image, run:
# docker build -f docker/frontend/Dockerfile -t avshalomts/frontend:latest .
# To run the container, use:
# docker run -p 8080:8080 avshalomts/frontend:latest
# To run the container in detached mode, use:
# docker run -d -p 8080:8080 avshalomts/frontend:latest
# To run the container to debug, use:
# docker run -it -p 8080:8080 avshalomts/frontend:latest /bin/sh

# Tag the image and push it to Docker Hub:
# docker push avshalomts/frontend:latest
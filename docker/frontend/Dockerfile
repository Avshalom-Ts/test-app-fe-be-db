FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./

RUN npm i
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

RUN npm i @nrwl/cli

COPY . .

RUN npx nx run back-end:build --configuration=development

# Use a simple HTTP server like serve (or you could use a basic Node.js server)
FROM node:lts-alpine
RUN npm install -g pm2
WORKDIR /app

# Copy the compiled Angular project from the build stage
COPY --from=build /app/dist/apps/front-end/browser /app

# Use the 'serve' command to serve the static files
CMD ["pm2-runtime", "serve", "--spa"]

EXPOSE 8080

# To build the image, run:
# docker build -f docker/frontend/Dockerfile -t avshalom/frontend:latest .
# To run the container, use:
# docker run -p 8080:8080 avshalom/frontend:latest
# To run the container in detached mode, use:
# docker run -d -p 8080:8080 avshalom/frontend:latest
# To run the container to debug, use:
# docker run -it -p 8080:8080 avshalom/frontend:latest /bin/sh
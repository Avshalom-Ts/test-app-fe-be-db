# Docker file for nestjs as backend
ARG BUILD_NODE_IMAGE=node:20-alpine

# BUILDER STEP
FROM ${BUILD_NODE_IMAGE} AS builder
WORKDIR /app
COPY package*.json ./


WORKDIR /app
RUN npm ci
# RUN npm i @nrwl/cli
COPY . .

RUN npx nx run back-end:build --configuration=production

RUN npm prune --production

# PRODUCTION
FROM ${BUILD_NODE_IMAGE} AS production
WORKDIR /app
# RUN npm install -g pm2
COPY --from=builder /app/dist/apps/back-end ./
COPY --from=builder /app/node_modules ./node_modules
# COPY --chown=node:node --from=builder /app/.env /app/.env

# ENV NODE_ENV=production
ENTRYPOINT [ "node","./main.js" ]

USER node
# CMD ["pm2-runtime", "start" ,"main.js", "--name", "back-end", "-i","3"]
# CMD ["pm2", "start" ,"main.js", "--name", "back-end", "-i","3"]
CMD ["node","main.js"]

ENV PORT=3000
EXPOSE ${PORT}


# To build the image, run:
# docker build -f docker/backend/Dockerfile -t avshalomts/backend:latest .
# To run the container, use:
# docker run -p 3000:3000 avshalomts/backend:latest
# To run the container in detached mode, use:
# docker run -d -p 3000:3000 avshalomts/backend:latest -t avshalom/backend:latest
# To run the container to debug, use:
# docker run -it -p 3000:3000 avshalomts/backend:latest /bin/sh

# Tag the image and push it to Docker Hub:
# docker push avshalomts/backend:latest

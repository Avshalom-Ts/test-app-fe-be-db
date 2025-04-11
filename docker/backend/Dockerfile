# Docker file for nestjs as backend
ARG IMAGE=node:lts-alpine

# BUILDER STEP
FROM $IMAGE AS builder
WORKDIR /app
COPY package*.json ./




WORKDIR /app
RUN npm i
# RUN npm i @nrwl/cli
COPY . .

RUN npx nx run back-end:build --configuration=development

# PRODUCTION
FROM $IMAGE AS dev
RUN npm install -g pm2
COPY --from=builder /app/dist/apps/back-end /app
COPY --from=builder /app/node_modules /app/node_modules
# COPY --chown=node:node --from=builder /app/.env /app/.env

# ENV NODE_ENV=production
ENTRYPOINT [ "node","./main.js" ]
WORKDIR /app
USER node
CMD ["pm2-runtime", "start" ,"main.js", "--name", "back-end", "-i","3"]
# CMD ["pm2", "start" ,"main.js", "--name", "back-end", "-i","3"]
# CMD ["node","main.js"]

ENV PORT=3000
EXPOSE ${PORT}


# To build the image, run:
# docker build -f docker/backend/Dockerfile -t avshalom/backend:latest .
# To run the container, use:
# docker run -p 3000:3000 avshalom/backend:latest
# To run the container in detached mode, use:
# docker run -d -p 3000:3000 avshalom/backend:latest -t avshalom/backend:latest
# To run the container to debug, use:
# docker run -it -p 3000:3000 avshalom/backend:latest /bin/sh

# Tag the image and push it to Docker Hub:
# docker tag avshalom/backend:latest avshalomts/backend:latest
# docker push avshalomts/backend:latest

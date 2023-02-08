#borrowed from sensorico frontline

FROM node:lts-alpine as base

# Make sure packages are indeed up to date
RUN apk add --no-cache nodejs-current npm
RUN npm upgrade -g npm

WORKDIR /app
COPY package.json package-lock.json ./

# Install deps but drop cache to reduce image size
RUN mkdir /tmp/cache && npm install --cache /tmp/cache && rm -rf /tmp/cache

# Using multi-stage build to optimize dependency installing

FROM base as prod

WORKDIR /app
COPY . ./


RUN npm run prisma generate && npm run build 

# TODO
# RUN npm test

EXPOSE 5000

CMD ["node", "dist/src/main"]
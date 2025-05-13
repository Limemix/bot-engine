# Stage 1 - Build
FROM node:22-alpine as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2 - Runtime
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/.env .env

CMD ["node", "dist/main.js"]
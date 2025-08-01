# === Stage 1: Builder ===
FROM node:18-alpine AS builder

WORKDIR /

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# === Stage 2: Runtime ===
FROM node:18-alpine

WORKDIR /

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]


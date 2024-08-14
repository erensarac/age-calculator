FROM oven/bun:1 AS base
WORKDIR /app

COPY package*.json /app/
RUN bun install

COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM nginx:1.21-alpine AS production
WORKDIR /app

COPY --from=base /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
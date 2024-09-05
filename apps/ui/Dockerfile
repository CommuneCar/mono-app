# Frontend Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
COPY apps/ui/package*.json ./apps/ui/

RUN npm ci

COPY . .

# Set API URL environment variable
ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=${VITE_BASE_API_URL}

RUN npm run build -w ui

FROM nginx:alpine

COPY --from=build /app/apps/ui/dist /usr/share/nginx/html
COPY apps/ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
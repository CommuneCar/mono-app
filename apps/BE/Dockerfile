# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy everything from the mono-repo
COPY . .

# Change directory to the backend and install dependencies
WORKDIR /app/apps/BE

# Install backend dependencies
RUN npm ci
RUN npx prisma generate

# Build the backend
RUN npm run build

# Expose the backend port
EXPOSE 8001

# Start the backend server
CMD ["node", "dist/index.js"]

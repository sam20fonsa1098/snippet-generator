# Stage 1: Build
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Copy only the package files first (to leverage Docker cache)
COPY package*.json ./

# Install all dependencies including dev
RUN npm install

# Copy the full source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Production
FROM node:22-slim AS production

WORKDIR /app

# Copy only package files and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled JS files from builder
COPY --from=builder /app/build ./build

# Copy any other necessary runtime files (e.g. .env, static assets)
# COPY --from=builder /app/public ./public

# Expose app port
EXPOSE 3030

# Start the application (adjust if your entry file is different)
CMD ["npm", "start"]
